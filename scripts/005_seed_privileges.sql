-- Seed initial privileges
insert into public.privileges (name, description, category, required_grade, required_subscription, limit_type, limit_value, limit_period, icon) values
  -- Streaming services
  ('Кинопоиск', 'Подписка на Кинопоиск на 1 месяц', 'streaming', 'bronze', null, 'count', 1, 'monthly', '🎬'),
  ('Okko', 'Подписка на Okko на 1 месяц', 'streaming', 'silver', null, 'count', 1, 'monthly', '📺'),
  ('ivi', 'Подписка на ivi на 1 месяц', 'streaming', 'bronze', null, 'count', 1, 'monthly', '🎥'),
  
  -- Antivirus
  ('Kaspersky', 'Антивирус Kaspersky на 1 год', 'antivirus', 'silver', null, 'count', 1, 'yearly', '🛡️'),
  ('Dr.Web', 'Антивирус Dr.Web на 1 год', 'antivirus', 'bronze', null, 'count', 1, 'yearly', '🔒'),
  
  -- Business lounges
  ('Бизнес-зал Аэрофлот', 'Проход в бизнес-зал аэропорта', 'lounge', 'gold', null, 'count', 2, 'monthly', '✈️'),
  ('Бизнес-зал РЖД', 'Проход в бизнес-зал вокзала', 'lounge', 'silver', null, 'count', 4, 'monthly', '🚄'),
  ('Priority Pass', 'Безлимитный доступ в бизнес-залы', 'lounge', 'diamond', null, 'unlimited', null, null, '💎'),
  
  -- Restaurants
  ('Скидка в ресторанах', 'Компенсация до 500₽ в неделю', 'restaurant', 'bronze', null, 'amount', 500, 'weekly', '🍽️'),
  ('Скидка в ресторанах Premium', 'Компенсация до 2000₽ в неделю', 'restaurant', 'gold', null, 'amount', 2000, 'weekly', '🥂'),
  ('Бесплатная доставка еды', 'Бесплатная доставка в Яндекс.Еда', 'restaurant', 'silver', null, 'count', 10, 'monthly', '🚚'),
  
  -- Events
  ('Концерты и мероприятия', 'Билеты на избранные мероприятия', 'events', 'gold', null, 'count', 2, 'monthly', '🎭'),
  ('Спортивные события', 'Билеты на спортивные мероприятия', 'events', 'diamond', null, 'count', 4, 'monthly', '⚽'),
  ('Музеи и выставки', 'Бесплатный вход в музеи', 'events', 'bronze', null, 'count', 5, 'monthly', '🎨'),
  
  -- Premium exclusive
  ('Консьерж-сервис', 'Персональный консьерж 24/7', 'other', 'diamond', 'premium', 'unlimited', null, null, '🎩'),
  ('Личный менеджер', 'Персональный менеджер банка', 'other', 'gold', 'premium', 'unlimited', null, null, '👔')
on conflict do nothing;
