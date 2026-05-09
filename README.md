# Abby Personal AI Assistant Kit

Kit ini berisi konfigurasi, persona, relationship layer, system prompt, aset visual, dan knowledge base awal untuk Abby — asisten AI pribadi dr Ferdi Iskandar.

## Struktur

```txt
src/config/
  abby.config.json
  abby.persona.json
  abby.relationship.json

src/prompts/
  abby.system-prompt.md

content/abby/
  personal-profile.md
  professional-journey.md
  speaking-profile.md
  thought-leadership.md
  projects-and-works.md
  media-kit.md
  contact-and-collaboration.md
  faq.md

public/assets/abby/
  abby-main.png
  abby-avatar.png

docs/
  ABBY_PRODUCT_SPEC.md
  ABBY_CODEX_IMPLEMENTATION_BRIEF.md
```

## Prinsip Utama

Abby bukan chatbot generik. Abby adalah asisten pribadi digital yang harus terasa hidup, hangat, profesional, sedikit witty, dan mampu membangun hubungan dari percakapan singkat.

## MVP Recommendation

Mulai dengan:
1. Chat UI sederhana.
2. Knowledge base berbasis Markdown.
3. System prompt Abby.
4. Visitor mode selector.
5. Suggested questions.
6. CTA routing.
7. Safety boundary untuk pertanyaan medis personal.

Jangan mulai dari voice, CRM kompleks, diagnosis, atau multi-agent.

