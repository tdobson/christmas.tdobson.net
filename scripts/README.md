# Database Scripts

## seed-database.ts

Generates SQL INSERT statements from the JSON configuration files.

### Usage

```bash
# Generate SQL to stdout
npx ts-node scripts/seed-database.ts

# Save to a file
npx ts-node scripts/seed-database.ts > data/seed.sql
```

### What it does

Reads the following JSON files:
- `config/tim-gifts.json`
- `config/jen-gifts.json`
- `config/james-gifts.json`
- `config/faq.json`
- `config/schedule.json`

And generates INSERT statements for these tables:
- `recipients` - Gift recipients (tim, jen, james)
- `categories` - Gift categories for each recipient
- `gifts` - Individual gift items with UUIDs
- `do_not_buy` - Items to avoid buying
- `notes` - Special notes per recipient
- `faq` and `faq_answers` - FAQ questions and answers
- `schedule_events`, `schedule_sections`, `schedule_items` - Calendar schedule
- `visiting_notes` - General visiting guidelines

### Features

- Generates UUIDs for all record IDs using Node.js crypto
- Properly escapes SQL strings (handles apostrophes, etc.)
- Automatically sets `allow_multiple = 1` for gifts containing "contribution" or "contributions" in the name
- Handles both simple FAQ answers (string) and multi-person answers (array)
- Handles schedule events with both simple descriptions and structured sections
