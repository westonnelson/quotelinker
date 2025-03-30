-- Sample leads data
INSERT INTO leads (full_name, email, phone, zip_code, insurance_type, status)
VALUES
  ('John Smith', 'john.smith@example.com', '(555) 123-4567', '10001', 'Life Insurance', 'new'),
  ('Sarah Johnson', 'sarah.j@example.com', '(555) 234-5678', '90210', 'Auto Insurance', 'new'),
  ('Michael Brown', 'mbrown@example.com', '(555) 345-6789', '60601', 'Home Insurance', 'new'),
  ('Emily Davis', 'emily.davis@example.com', '(555) 456-7890', '75001', 'Health Insurance', 'new'),
  ('Robert Wilson', 'rwilson@example.com', '(555) 567-8901', '33101', 'Life Insurance', 'new');

-- Note: Agent profiles will be created when agents sign up through the application
-- You'll need to create an admin user manually through the Supabase dashboard
-- and set their user_metadata.role = 'admin'

