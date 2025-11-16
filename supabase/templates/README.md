# GatherEase Email Templates

This folder contains custom email templates for Supabase authentication emails.

## How to Use

1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/vokuawjajegjsnxgkbbl

2. Navigate to: **Authentication** → **Email Templates**

3. Copy the content from the HTML files in this folder and paste them into the corresponding email templates in Supabase.

## Templates

- `reset_password.html` - Password reset email template
- More templates can be added as needed

## Important Variables

Supabase uses Go templates. Available variables:

- `{{ .ConfirmationURL }}` - The confirmation/reset link
- `{{ .Token }}` - The confirmation token
- `{{ .TokenHash }}` - The hashed token
- `{{ .SiteURL }}` - Your site URL
- `{{ .Email }}` - User's email address

## Removing "Made with Lovable" Branding

The templates in this folder have already removed all Lovable branding and replaced it with GatherEase branding. Simply copy and paste them into your Supabase dashboard to update your emails.
