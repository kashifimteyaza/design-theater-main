# Design Theater

Benchmark artifacts and evaluation code for Design Theater: A Benchmark for Generative UI* (AIES 2026),
a study of whether generative UI tools implement the design rationales they
present to users.

📄 :

## Contents

- **`artifacts/`** — the 24 benchmark tasks and 120 generated interfaces
  (5 tools × 24 tasks): prompts, reasoning traces, generated code, screenshots
- **`pipeline/`** — code to compute the Design Homogeneity Index; see
  [`pipeline/README.md`](pipeline/README.md)

## The benchmark

24 tasks across three tiers, eight each: **structural** (information
architecture, navigation), **styling** (color, typography, hierarchy), and
**functional** (interaction, error handling, state). Each prompt embeds two UX
principles implicitly, through user needs and context rather than by naming
them, so the benchmark tests recognition rather than instruction-following.

Tools were restricted to HTML, CSS, and JavaScript with no external frameworks,
libraries, or web search, and run in their default configurations. 

| Tool | Underlying model |
|---|---|
| ChatGPT | GPT-5 Thinking |
| Claude | Claude Sonnet 4.5 |
| Bolt | Claude Sonnet 4.5 |
| Vercel v0 | Claude Haiku 4.5 |
| Firebase Studio | Gemini 2.5 Pro |

## Getting started

```bash
git clone https://github.com/kashifimteyaza/design-theater-main.git
cd design-theater-main
```

Browse `artifacts/` for benchmark content, or see `pipeline/README.md` to run
the DHI evaluation.

## Citation

```bibtex
@inproceedings{imteyaz2026design,
  title     = {[ Design Theater: A Benchmark for Generative UI]},
  author    = {Imteyaz, Kashif and Imteyaz, Kaif and Rajpal, Nakul and
               Shaikh, Kaif and Muller, Michael and Savage, Saiph},
  booktitle = {Proceedings of the AAAI/ACM Conference on AI, Ethics, and Society},
  year      = {2026}
}
```

## License

[CC BY 4.0 for benchmark tasks; MIT for pipeline code.] Reasoning traces and
generated code are model outputs redistributed for research and evaluation, and
remain subject to each provider's terms.
