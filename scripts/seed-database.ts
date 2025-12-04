import * as fs from 'fs';
import * as path from 'path';
import { v7 as uuidv7 } from 'uuid';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read JSON files
const timGifts = JSON.parse(fs.readFileSync(path.join(__dirname, '../config/tim-gifts.json'), 'utf-8'));
const jenGifts = JSON.parse(fs.readFileSync(path.join(__dirname, '../config/jen-gifts.json'), 'utf-8'));
const jamesGifts = JSON.parse(fs.readFileSync(path.join(__dirname, '../config/james-gifts.json'), 'utf-8'));
const faq = JSON.parse(fs.readFileSync(path.join(__dirname, '../config/faq.json'), 'utf-8'));
const schedule = JSON.parse(fs.readFileSync(path.join(__dirname, '../config/schedule.json'), 'utf-8'));

// Helper to escape SQL strings
function escapeSql(str: string | null | undefined): string {
  if (str === null || str === undefined || str === '') return 'NULL';
  return "'" + str.replace(/'/g, "''") + "'";
}

// Helper to check if a gift allows multiple claims
function allowsMultiple(giftName: string): number {
  const lowerName = giftName.toLowerCase();
  return (lowerName.includes('contribution') || lowerName.includes('contributions')) ? 1 : 0;
}

// Generate SQL
let sql = '';

// ============================================================================
// Recipients
// ============================================================================
sql += `-- Recipients\n`;
sql += `INSERT INTO recipients (id, name, slug) VALUES ('tim', 'Tim', 'tim');\n`;
sql += `INSERT INTO recipients (id, name, slug) VALUES ('jen', 'Jen', 'jen');\n`;
sql += `INSERT INTO recipients (id, name, slug) VALUES ('james', 'James', 'james');\n`;
sql += `\n`;

// ============================================================================
// Categories
// ============================================================================
sql += `-- Categories\n`;

// Tim's categories
Object.entries(timGifts.categories).forEach(([key, cat]: [string, any]) => {
  const id = `tim-${key}`;
  sql += `INSERT INTO categories (id, recipient_id, key, title, icon, color) VALUES (`;
  sql += `${escapeSql(id)}, 'tim', ${escapeSql(key)}, ${escapeSql(cat.title)}, ${escapeSql(cat.icon)}, ${escapeSql(cat.color)});\n`;
});

// Jen's categories
Object.entries(jenGifts.categories).forEach(([key, cat]: [string, any]) => {
  const id = `jen-${key}`;
  sql += `INSERT INTO categories (id, recipient_id, key, title, icon, color) VALUES (`;
  sql += `${escapeSql(id)}, 'jen', ${escapeSql(key)}, ${escapeSql(cat.title)}, ${escapeSql(cat.icon)}, ${escapeSql(cat.color)});\n`;
});

// James's categories
Object.entries(jamesGifts.categories).forEach(([key, cat]: [string, any]) => {
  const id = `james-${key}`;
  sql += `INSERT INTO categories (id, recipient_id, key, title, icon, color) VALUES (`;
  sql += `${escapeSql(id)}, 'james', ${escapeSql(key)}, ${escapeSql(cat.title)}, ${escapeSql(cat.icon)}, ${escapeSql(cat.color)});\n`;
});

sql += `\n`;

// ============================================================================
// Gifts
// ============================================================================
sql += `-- Gifts\n`;

// Tim's gifts
timGifts.items.forEach((gift: any) => {
  const id = uuidv7();
  const recipientId = 'tim';
  sql += `INSERT INTO gifts (id, recipient_id, category_key, name, short_description, long_description, icon, url, price, price_indicator, allow_multiple) VALUES (`;
  sql += `${escapeSql(id)}, `;
  sql += `${escapeSql(recipientId)}, `;
  sql += `${escapeSql(gift.category)}, `;
  sql += `${escapeSql(gift.name)}, `;
  sql += `${escapeSql(gift.shortDescription)}, `;
  sql += `${escapeSql(gift.longDescription)}, `;
  sql += `${escapeSql(gift.icon)}, `;
  sql += `${escapeSql(gift.url)}, `;
  sql += `${gift.price !== undefined ? gift.price : 'NULL'}, `;
  sql += `${escapeSql(gift.priceIndicator)}, `;
  sql += `${allowsMultiple(gift.name)});\n`;
});

// Jen's gifts
jenGifts.items.forEach((gift: any) => {
  const id = uuidv7();
  const recipientId = 'jen';
  sql += `INSERT INTO gifts (id, recipient_id, category_key, name, short_description, long_description, icon, url, price, price_indicator, allow_multiple) VALUES (`;
  sql += `${escapeSql(id)}, `;
  sql += `${escapeSql(recipientId)}, `;
  sql += `${escapeSql(gift.category)}, `;
  sql += `${escapeSql(gift.name)}, `;
  sql += `${escapeSql(gift.shortDescription)}, `;
  sql += `${escapeSql(gift.longDescription)}, `;
  sql += `${escapeSql(gift.icon)}, `;
  sql += `${escapeSql(gift.url)}, `;
  sql += `${gift.price !== undefined ? gift.price : 'NULL'}, `;
  sql += `${escapeSql(gift.priceIndicator)}, `;
  sql += `${allowsMultiple(gift.name)});\n`;
});

// James's gifts
jamesGifts.items.forEach((gift: any) => {
  const id = uuidv7();
  const recipientId = 'james';
  sql += `INSERT INTO gifts (id, recipient_id, category_key, name, short_description, long_description, icon, url, price, price_indicator, allow_multiple) VALUES (`;
  sql += `${escapeSql(id)}, `;
  sql += `${escapeSql(recipientId)}, `;
  sql += `${escapeSql(gift.category)}, `;
  sql += `${escapeSql(gift.name)}, `;
  sql += `${escapeSql(gift.shortDescription)}, `;
  sql += `${escapeSql(gift.longDescription)}, `;
  sql += `${escapeSql(gift.icon)}, `;
  sql += `${escapeSql(gift.url)}, `;
  sql += `${gift.price !== undefined ? gift.price : 'NULL'}, `;
  sql += `${escapeSql(gift.priceIndicator)}, `;
  sql += `${allowsMultiple(gift.name)});\n`;
});

sql += `\n`;

// ============================================================================
// Do Not Buy Lists
// ============================================================================
sql += `-- Do Not Buy Lists\n`;

// Only James has a doNotBuy list
if (jamesGifts.doNotBuy && Array.isArray(jamesGifts.doNotBuy)) {
  jamesGifts.doNotBuy.forEach((item: string) => {
    const id = uuidv7();
    sql += `INSERT INTO do_not_buy (id, recipient_id, item) VALUES (${escapeSql(id)}, 'james', ${escapeSql(item)});\n`;
  });
}

sql += `\n`;

// ============================================================================
// Notes
// ============================================================================
sql += `-- Notes\n`;

// Tim's notes
if (timGifts.notes) {
  Object.entries(timGifts.notes).forEach(([key, value]: [string, any]) => {
    const id = uuidv7();
    sql += `INSERT INTO notes (id, recipient_id, key, value) VALUES (${escapeSql(id)}, 'tim', ${escapeSql(key)}, ${escapeSql(value)});\n`;
  });
}

// James's notes
if (jamesGifts.notes) {
  Object.entries(jamesGifts.notes).forEach(([key, value]: [string, any]) => {
    const id = uuidv7();
    sql += `INSERT INTO notes (id, recipient_id, key, value) VALUES (${escapeSql(id)}, 'james', ${escapeSql(key)}, ${escapeSql(value)});\n`;
  });
}

sql += `\n`;

// ============================================================================
// FAQ
// ============================================================================
sql += `-- FAQ\n`;

faq.questions.forEach((q: any, index: number) => {
  const id = uuidv7();

  // Handle both 'answer' (string) and 'answers' (array) formats
  if (q.answer && typeof q.answer === 'string') {
    // Simple question with a single answer
    sql += `INSERT INTO faq (id, question, answer, sort_order) VALUES (${escapeSql(id)}, ${escapeSql(q.question)}, ${escapeSql(q.answer)}, ${index});\n`;
  } else if (q.answers && Array.isArray(q.answers)) {
    // Question with multiple person-specific answers
    sql += `INSERT INTO faq (id, question, answer, sort_order) VALUES (${escapeSql(id)}, ${escapeSql(q.question)}, NULL, ${index});\n`;

    // Add the individual answers
    q.answers.forEach((ans: any) => {
      const answerId = uuidv7();
      sql += `INSERT INTO faq_answers (id, faq_id, person, requirements) VALUES (${escapeSql(answerId)}, ${escapeSql(id)}, ${escapeSql(ans.person)}, ${escapeSql(ans.requirements)});\n`;
    });
  }
});

sql += `\n`;

// ============================================================================
// Schedule
// ============================================================================
sql += `-- Schedule Events\n`;

schedule.events.forEach((event: any, eventIndex: number) => {
  const eventId = uuidv7();

  sql += `INSERT INTO schedule_events (id, date, iso_date, icon, description, sort_order) VALUES (`;
  sql += `${escapeSql(eventId)}, `;
  sql += `${escapeSql(event.date)}, `;
  sql += `${escapeSql(event.isoDate)}, `;
  sql += `${escapeSql(event.icon)}, `;
  sql += `${escapeSql(event.description)}, `;
  sql += `${eventIndex});\n`;

  // Handle sections if they exist
  if (event.sections && Array.isArray(event.sections)) {
    event.sections.forEach((section: any, sectionIndex: number) => {
      const sectionId = uuidv7();

      sql += `INSERT INTO schedule_sections (id, event_id, title, sort_order) VALUES (`;
      sql += `${escapeSql(sectionId)}, `;
      sql += `${escapeSql(eventId)}, `;
      sql += `${escapeSql(section.title)}, `;
      sql += `${sectionIndex});\n`;

      // Handle items within the section
      if (section.items && Array.isArray(section.items)) {
        section.items.forEach((item: string, itemIndex: number) => {
          const itemId = uuidv7();

          sql += `INSERT INTO schedule_items (id, section_id, content, sort_order) VALUES (`;
          sql += `${escapeSql(itemId)}, `;
          sql += `${escapeSql(sectionId)}, `;
          sql += `${escapeSql(item)}, `;
          sql += `${itemIndex});\n`;
        });
      }
    });
  }
});

sql += `\n`;

// ============================================================================
// Visiting Notes
// ============================================================================
sql += `-- Visiting Notes\n`;

if (schedule.visitingNotes && Array.isArray(schedule.visitingNotes)) {
  schedule.visitingNotes.forEach((note: string, index: number) => {
    const id = uuidv7();
    sql += `INSERT INTO visiting_notes (id, content, sort_order) VALUES (${escapeSql(id)}, ${escapeSql(note)}, ${index});\n`;
  });
}

// Output the SQL
console.log(sql);
