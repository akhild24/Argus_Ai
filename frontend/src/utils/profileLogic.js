export function buildProfile(formData) {
    const skillMap = {
      delivery: 'Logistics & Route Optimization',
      farming: 'Resource Management & Planning',
      shop: 'Customer Relations & Operations',
      other: 'Problem Solving & Adaptability',
    };
  
    return {
      name: formData.name || 'Learner',
      subject: formData.subject,
      style: formData.style,
      level: formData.level,
      language: formData.language,
      city: formData.city || 'Indore',
      hiddenSkill: skillMap[formData.experience] || skillMap.other,
      progress: 0,
    };
  }