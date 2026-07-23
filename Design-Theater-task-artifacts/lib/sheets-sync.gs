
const SPREADSHEET_ID = "";

// Real question names
const QUESTIONS = {
  Q1: "HTML_Structure_Similarity",
  Q2: "Structural_Design_Patterns",
  Q3: "CSS_Properties",
  Q4: "Class_Code_Idioms",
  Q5: "Rendered_Output_Similarity"
};

// Tool/Model mapping
const TOOLS = {
  chatgpt: { name: "ChatGPT", model: "GPT-5 Thinking", sheet: "ChatGPT_All_Tiers" },
  claude: { name: "Claude", model: "Sonnet 4 Thinking", sheet: "Claude_All_Tiers" },
  firebase: { name: "Firebase", model: "Gemini 2.5 Pro", sheet: "Firebase_All_Tiers" },
  bolt: { name: "Bolt", model: "v1 agent (legacy)", sheet: "Bolt_All_Tiers" },
  v0: { name: "V0", model: "v0 Mini (Claude Haiku)", sheet: "V0_All_Tiers" }
};

// Sheet names
const SHEETS = {
  MASTER: "Master_Summary",
  TIER1: "Tier1_All_Tools",
  TIER2: "Tier2_All_Tools",
  TIER3: "Tier3_All_Tools",
  ANALYTICS: "Analytics",
  ...Object.fromEntries(Object.entries(TOOLS).map(([k, v]) => [k.toUpperCase(), v.sheet]))
};

// Parse taskId to extract tool and tier
function parseTaskId(taskId) {
  // Format: "chatgpt-task1.1" or "claude-task2.3"
  const parts = taskId.split("-");
  const toolKey = parts[0] || "";
  const taskPart = parts[1] || "";

  let tier = "unknown";
  if (taskPart.startsWith("task1")) tier = "Tier1";
  else if (taskPart.startsWith("task2")) tier = "Tier2";
  else if (taskPart.startsWith("task3")) tier = "Tier3";

  const taskNumber = taskPart.replace("task", "") || "";

  return {
    toolKey: toolKey,
    toolName: TOOLS[toolKey]?.name || toolKey,
    modelName: TOOLS[toolKey]?.model || "",
    tier: tier,
    taskNumber: taskNumber
  };
}

// Common headers for all sheets
function getHeaders() {
  return [
    "Timestamp",
    "Evaluator",
    "Tool",
    "Model",
    "Tier",
    "Task_Number",
    "Task_ID",
    QUESTIONS.Q1,
    "Q1_Note",
    QUESTIONS.Q2,
    "Q2_Note",
    QUESTIONS.Q3,
    "Q3_Note",
    QUESTIONS.Q4,
    "Q4_Note",
    QUESTIONS.Q5,
    "Total_Score",
    "Overall_Observation"
  ];
}

// Initialize all sheets
function initializeSheets() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const headers = getHeaders();

  // Colors for different sheet types
  const colors = {
    master: "#1a73e8",
    tier: "#34a853",
    tool: "#ea4335",
    analytics: "#9c27b0"
  };

  // Master Summary
  createSheet(ss, SHEETS.MASTER, headers, colors.master);

  // Tier sheets
  createSheet(ss, SHEETS.TIER1, headers, colors.tier);
  createSheet(ss, SHEETS.TIER2, headers, colors.tier);
  createSheet(ss, SHEETS.TIER3, headers, colors.tier);

  // Tool sheets
  Object.values(TOOLS).forEach(tool => {
    createSheet(ss, tool.sheet, headers, colors.tool);
  });

  // Analytics sheet
  createAnalyticsSheet(ss, colors.analytics);

  return "All sheets initialized successfully!";
}

function createSheet(ss, name, headers, color) {
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length)
      .setFontWeight("bold")
      .setBackground(color)
      .setFontColor("white");
    sheet.setFrozenRows(1);

    // Auto-resize columns
    for (let i = 1; i <= headers.length; i++) {
      sheet.autoResizeColumn(i);
    }
  }
  return sheet;
}

function createAnalyticsSheet(ss, color) {
  let sheet = ss.getSheetByName(SHEETS.ANALYTICS);
  if (!sheet) {
    sheet = ss.insertSheet(SHEETS.ANALYTICS);

    // Header
    sheet.getRange("A1").setValue("Code-Level Homogenization Analytics");
    sheet.getRange("A1:F1").merge().setFontWeight("bold").setFontSize(14).setBackground(color).setFontColor("white");

    // Section 1: Average Scores by Tool
    sheet.getRange("A3").setValue("AVERAGE SCORES BY TOOL").setFontWeight("bold");
    sheet.getRange("A4:G4").setValues([["Tool", "HTML_Structure", "Design_Patterns", "CSS_Props", "Code_Idioms", "Visual_Output", "Total_Avg"]]);
    sheet.getRange("A4:G4").setFontWeight("bold").setBackground("#e8eaed");

    let row = 5;
    Object.values(TOOLS).forEach(tool => {
      const sheetName = tool.sheet;
      sheet.getRange(row, 1).setValue(tool.name);
      sheet.getRange(row, 2).setFormula(`=IFERROR(AVERAGE('${sheetName}'!H2:H), 0)`);
      sheet.getRange(row, 3).setFormula(`=IFERROR(AVERAGE('${sheetName}'!J2:J), 0)`);
      sheet.getRange(row, 4).setFormula(`=IFERROR(AVERAGE('${sheetName}'!L2:L), 0)`);
      sheet.getRange(row, 5).setFormula(`=IFERROR(AVERAGE('${sheetName}'!N2:N), 0)`);
      sheet.getRange(row, 6).setFormula(`=IFERROR(AVERAGE('${sheetName}'!P2:P), 0)`);
      sheet.getRange(row, 7).setFormula(`=IFERROR(AVERAGE('${sheetName}'!Q2:Q), 0)`);
      row++;
    });

    // Section 2: Average Scores by Tier
    row += 2;
    sheet.getRange("A" + row).setValue("AVERAGE SCORES BY TIER").setFontWeight("bold");
    row++;
    sheet.getRange(row, 1, 1, 7).setValues([["Tier", "HTML_Structure", "Design_Patterns", "CSS_Props", "Code_Idioms", "Visual_Output", "Total_Avg"]]);
    sheet.getRange(row, 1, 1, 7).setFontWeight("bold").setBackground("#e8eaed");
    row++;

    ["Tier1_All_Tools", "Tier2_All_Tools", "Tier3_All_Tools"].forEach((tierSheet, i) => {
      sheet.getRange(row, 1).setValue("Tier " + (i + 1));
      sheet.getRange(row, 2).setFormula(`=IFERROR(AVERAGE('${tierSheet}'!H2:H), 0)`);
      sheet.getRange(row, 3).setFormula(`=IFERROR(AVERAGE('${tierSheet}'!J2:J), 0)`);
      sheet.getRange(row, 4).setFormula(`=IFERROR(AVERAGE('${tierSheet}'!L2:L), 0)`);
      sheet.getRange(row, 5).setFormula(`=IFERROR(AVERAGE('${tierSheet}'!N2:N), 0)`);
      sheet.getRange(row, 6).setFormula(`=IFERROR(AVERAGE('${tierSheet}'!P2:P), 0)`);
      sheet.getRange(row, 7).setFormula(`=IFERROR(AVERAGE('${tierSheet}'!Q2:Q), 0)`);
      row++;
    });

    // Section 3: Evaluation Counts
    row += 2;
    sheet.getRange("A" + row).setValue("EVALUATION COUNTS").setFontWeight("bold");
    row++;
    sheet.getRange(row, 1, 1, 3).setValues([["Category", "Sheet", "Count"]]);
    sheet.getRange(row, 1, 1, 3).setFontWeight("bold").setBackground("#e8eaed");
    row++;

    sheet.getRange(row, 1).setValue("Total");
    sheet.getRange(row, 2).setValue("Master_Summary");
    sheet.getRange(row, 3).setFormula(`=MAX(0, COUNTA('Master_Summary'!A:A) - 1)`);
    row++;

    Object.values(TOOLS).forEach(tool => {
      sheet.getRange(row, 1).setValue(tool.name);
      sheet.getRange(row, 2).setValue(tool.sheet);
      sheet.getRange(row, 3).setFormula(`=MAX(0, COUNTA('${tool.sheet}'!A:A) - 1)`);
      row++;
    });

    // Section 4: Homogenization Index (Higher = More Similar)
    row += 2;
    sheet.getRange("A" + row).setValue("HOMOGENIZATION INDEX").setFontWeight("bold");
    row++;
    sheet.getRange("A" + row).setValue("(Average total score across all tools - higher means more similar outputs)");
    sheet.getRange("A" + row).setFontStyle("italic").setFontColor("#666");
    row++;
    sheet.getRange("A" + row).setValue("Overall Index:");
    sheet.getRange("B" + row).setFormula(`=IFERROR(AVERAGE('Master_Summary'!Q2:Q), 0)`);
    sheet.getRange("B" + row).setNumberFormat("0.00");

    // Section 5: Cross-Tool Comparison Matrix placeholder
    row += 3;
    sheet.getRange("A" + row).setValue("QUESTION-WISE BREAKDOWN").setFontWeight("bold");
    row++;
    sheet.getRange(row, 1, 1, 6).setValues([["Question", "Min", "Max", "Average", "Std Dev", "Interpretation"]]);
    sheet.getRange(row, 1, 1, 6).setFontWeight("bold").setBackground("#e8eaed");
    row++;

    const questionList = [
      ["HTML Structure Similarity", "H"],
      ["Structural Design Patterns", "J"],
      ["CSS Properties", "L"],
      ["Class & Code Idioms", "N"],
      ["Rendered Output Similarity", "P"]
    ];

    questionList.forEach(([qName, col]) => {
      sheet.getRange(row, 1).setValue(qName);
      sheet.getRange(row, 2).setFormula(`=IFERROR(MIN('Master_Summary'!${col}2:${col}), 0)`);
      sheet.getRange(row, 3).setFormula(`=IFERROR(MAX('Master_Summary'!${col}2:${col}), 0)`);
      sheet.getRange(row, 4).setFormula(`=IFERROR(AVERAGE('Master_Summary'!${col}2:${col}), 0)`);
      sheet.getRange(row, 5).setFormula(`=IFERROR(STDEV('Master_Summary'!${col}2:${col}), 0)`);
      sheet.getRange(row, 6).setFormula(`=IF(B${row}>=1.5, "High Convergence", IF(B${row}>=0.5, "Moderate", "Low Convergence"))`);
      row++;
    });

    sheet.autoResizeColumns(1, 7);
  }
  return sheet;
}

// Handle POST requests
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

    // Parse task info
    const taskInfo = parseTaskId(data.taskId);

    // Common row data
    const timestamp = data.timestamp || new Date().toISOString();
    const total = (data.q1Score || 0) + (data.q2Score || 0) + (data.q3Score || 0) + (data.q4Score || 0) + (data.q5Score || 0);

    const rowData = [
      timestamp,
      data.evaluatorName || "",
      taskInfo.toolName,
      taskInfo.modelName || data.toolModel || "",
      taskInfo.tier,
      taskInfo.taskNumber,
      data.taskId || "",
      data.q1Score || 0,
      data.q1Note || "",
      data.q2Score || 0,
      data.q2Note || "",
      data.q3Score || 0,
      data.q3Note || "",
      data.q4Score || 0,
      data.q4Note || "",
      data.q5Score || 0,
      total,
      data.overallObservation || ""
    ];

    // Append to Master Summary
    appendToSheet(ss, SHEETS.MASTER, rowData);

    // Append to appropriate Tier sheet
    const tierSheet = SHEETS[taskInfo.tier.toUpperCase()];
    if (tierSheet) {
      appendToSheet(ss, tierSheet, rowData);
    }

    // Append to appropriate Tool sheet
    const toolInfo = TOOLS[taskInfo.toolKey];
    if (toolInfo) {
      appendToSheet(ss, toolInfo.sheet, rowData);
    }

    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: "Data synced to all relevant sheets",
        sheets: [SHEETS.MASTER, tierSheet, toolInfo?.sheet].filter(Boolean)
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function appendToSheet(ss, sheetName, rowData) {
  const sheet = ss.getSheetByName(sheetName);
  if (sheet) {
    sheet.appendRow(rowData);
  }
}

// Handle GET requests
function doGet(e) {
  initializeSheets();

  return ContentService
    .createTextOutput(JSON.stringify({
      success: true,
      message: "Sheets API ready. All sheets initialized.",
      sheets: Object.values(SHEETS),
      tools: Object.keys(TOOLS)
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Utility: Refresh all analytics formulas
function refreshAnalytics() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const analytics = ss.getSheetByName(SHEETS.ANALYTICS);
  if (analytics) {
    // Force refresh by getting all values
    analytics.getDataRange().getValues();
  }
  return "Analytics refreshed";
}

// Utility: Get summary stats
function getSummaryStats() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const master = ss.getSheetByName(SHEETS.MASTER);

  if (!master || master.getLastRow() < 2) {
    return { totalEvaluations: 0, tools: {}, tiers: {} };
  }

  const data = master.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1);

  const stats = {
    totalEvaluations: rows.length,
    averageScore: 0,
    tools: {},
    tiers: {}
  };

  let totalSum = 0;
  rows.forEach(row => {
    const tool = row[2];
    const tier = row[4];
    const score = row[16];

    totalSum += score;

    if (!stats.tools[tool]) stats.tools[tool] = { count: 0, totalScore: 0 };
    stats.tools[tool].count++;
    stats.tools[tool].totalScore += score;

    if (!stats.tiers[tier]) stats.tiers[tier] = { count: 0, totalScore: 0 };
    stats.tiers[tier].count++;
    stats.tiers[tier].totalScore += score;
  });

  stats.averageScore = rows.length > 0 ? totalSum / rows.length : 0;

  // Calculate averages
  Object.keys(stats.tools).forEach(t => {
    stats.tools[t].average = stats.tools[t].totalScore / stats.tools[t].count;
  });
  Object.keys(stats.tiers).forEach(t => {
    stats.tiers[t].average = stats.tiers[t].totalScore / stats.tiers[t].count;
  });

  return stats;
}

// Run this once to set up all sheets
function setupAllSheets() {
  const result = initializeSheets();
  Logger.log(result);
  return result;
}

// Clear all data (except headers) - USE WITH CAUTION
function clearAllData() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  Object.values(SHEETS).forEach(sheetName => {
    if (sheetName === SHEETS.ANALYTICS) return; // Don't clear analytics
    const sheet = ss.getSheetByName(sheetName);
    if (sheet && sheet.getLastRow() > 1) {
      sheet.deleteRows(2, sheet.getLastRow() - 1);
    }
  });
  return "All data cleared";
}

// Export data as JSON
function exportAsJSON() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const master = ss.getSheetByName(SHEETS.MASTER);

  if (!master || master.getLastRow() < 2) {
    return JSON.stringify([]);
  }

  const data = master.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1);

  const result = rows.map(row => {
    const obj = {};
    headers.forEach((h, i) => {
      obj[h] = row[i];
    });
    return obj;
  });

  return JSON.stringify(result, null, 2);
}
