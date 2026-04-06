-- Supabase veritabanı tablolarını ve kurallarını (policies) oluşturmak için bu kodu 
-- Supabase Dashboard -> SQL Editor kısmına yapıştırıp "Run" (Çalıştır) butonuna basın.

CREATE TABLE IF NOT EXISTS public.network_stories (
    id text PRIMARY KEY,
    "authorEmail" text NOT NULL,
    "authorName" text NOT NULL,
    career text NOT NULL,
    age integer,
    gender text,
    traits text,
    story text NOT NULL,
    "avatarBase64" text,
    created_at timestamp with time zone default timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.network_requests (
    id text PRIMARY KEY,
    "fromEmail" text NOT NULL,
    "fromName" text NOT NULL,
    "toEmail" text NOT NULL,
    "toName" text NOT NULL,
    introduction text NOT NULL,
    status text NOT NULL DEFAULT 'pending',
    messages jsonb NOT NULL DEFAULT '[]'::jsonb,
    created_at timestamp with time zone default timezone('utc'::text, now()) NOT NULL
);

-- RLS (Row Level Security) Aktifleştiriliyor
ALTER TABLE public.network_stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.network_requests ENABLE ROW LEVEL SECURITY;

-- Demo projesi için herkesin okuyup/yazabileceği kurallar tanımlanıyor
CREATE POLICY "Allow all operations for network_stories" 
ON public.network_stories 
FOR ALL 
USING (true) 
WITH CHECK (true);

CREATE POLICY "Allow all operations for network_requests" 
ON public.network_requests 
FOR ALL 
USING (true) 
WITH CHECK (true);
