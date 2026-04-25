const hiddenSkillMap = {
    delivery: 'Route Optimization & Time Management',
    farming:  'Pattern Recognition & Seasonal Planning',
    shop:     'Business Logic & Customer Handling',
    other:    'Problem Solving & Adaptability',
  };
  
  export function buildProfile(data) {
    return {
      name:       data.name,
      degree:     data.degree,
      subject:    data.subject,
      style:      data.style,
      level:      data.level,
      language:   data.language,
      city:       data.city,
      experience: data.experience,
      hiddenSkill: hiddenSkillMap[data.experience] || 'Problem Solving & Adaptability',
      progress:   0,
    };
  }