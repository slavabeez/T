-- Add custom_limit column to user_privileges table
ALTER TABLE user_privileges
ADD COLUMN IF NOT EXISTS custom_limit INTEGER;

-- Update the check constraint to use custom_limit if set
-- This allows admins to override the default privilege limit for specific users
COMMENT ON COLUMN user_privileges.custom_limit IS 'Custom limit set by admin, overrides privilege.limit_value';
