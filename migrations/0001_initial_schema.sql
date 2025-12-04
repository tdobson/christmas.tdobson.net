-- Gift recipients
CREATE TABLE recipients (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL
);

-- Gift categories per recipient
CREATE TABLE categories (
  id TEXT PRIMARY KEY,
  recipient_id TEXT NOT NULL,
  key TEXT NOT NULL,
  title TEXT NOT NULL,
  icon TEXT,
  color TEXT,
  FOREIGN KEY (recipient_id) REFERENCES recipients(id)
);

-- Gift items
CREATE TABLE gifts (
  id TEXT PRIMARY KEY,
  recipient_id TEXT NOT NULL,
  category_key TEXT NOT NULL,
  name TEXT NOT NULL,
  short_description TEXT,
  long_description TEXT,
  icon TEXT,
  url TEXT,
  price INTEGER,
  price_indicator TEXT,
  allow_multiple INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (recipient_id) REFERENCES recipients(id)
);

-- Claims on gifts
CREATE TABLE claims (
  id TEXT PRIMARY KEY,
  gift_id TEXT NOT NULL,
  email TEXT NOT NULL,
  claimed_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (gift_id) REFERENCES gifts(id)
);

-- PoW challenges (short-lived)
CREATE TABLE challenges (
  id TEXT PRIMARY KEY,
  challenge TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now')),
  used INTEGER DEFAULT 0
);

-- Do-not-buy lists
CREATE TABLE do_not_buy (
  id TEXT PRIMARY KEY,
  recipient_id TEXT NOT NULL,
  item TEXT NOT NULL,
  FOREIGN KEY (recipient_id) REFERENCES recipients(id)
);

-- Notes per recipient
CREATE TABLE notes (
  id TEXT PRIMARY KEY,
  recipient_id TEXT NOT NULL,
  key TEXT NOT NULL,
  value TEXT NOT NULL,
  FOREIGN KEY (recipient_id) REFERENCES recipients(id)
);

-- FAQ entries
CREATE TABLE faq (
  id TEXT PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT,
  sort_order INTEGER DEFAULT 0
);

-- FAQ answers for multi-person questions
CREATE TABLE faq_answers (
  id TEXT PRIMARY KEY,
  faq_id TEXT NOT NULL,
  person TEXT NOT NULL,
  requirements TEXT NOT NULL,
  FOREIGN KEY (faq_id) REFERENCES faq(id)
);

-- Schedule events
CREATE TABLE schedule_events (
  id TEXT PRIMARY KEY,
  date TEXT NOT NULL,
  iso_date TEXT NOT NULL,
  icon TEXT,
  description TEXT,
  sort_order INTEGER DEFAULT 0
);

-- Schedule event sections
CREATE TABLE schedule_sections (
  id TEXT PRIMARY KEY,
  event_id TEXT NOT NULL,
  title TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  FOREIGN KEY (event_id) REFERENCES schedule_events(id)
);

-- Schedule section items
CREATE TABLE schedule_items (
  id TEXT PRIMARY KEY,
  section_id TEXT NOT NULL,
  content TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  FOREIGN KEY (section_id) REFERENCES schedule_sections(id)
);

-- Visiting notes
CREATE TABLE visiting_notes (
  id TEXT PRIMARY KEY,
  content TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0
);

-- Indexes
CREATE INDEX idx_gifts_recipient ON gifts(recipient_id);
CREATE INDEX idx_claims_gift ON claims(gift_id);
CREATE INDEX idx_challenges_created ON challenges(created_at);
CREATE INDEX idx_categories_recipient ON categories(recipient_id);
CREATE INDEX idx_do_not_buy_recipient ON do_not_buy(recipient_id);
