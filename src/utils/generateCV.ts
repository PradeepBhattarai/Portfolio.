interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
}

interface Education {
  degree: string;
  institution: string;
  period: string;
  status: string;
}

interface Experience {
  position: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
}

interface Skill {
  name: string;
  level: number;
}

interface Skills {
  programming_languages: Skill[];
  frameworks: Skill[];
  databases: Skill[];
}

export const generateCV = (
  personalInfo: PersonalInfo,
  education: Education[],
  experience: Experience[],
  skills: any
) => {
  const renderSkillCategory = (title: string, items?: Skill[]) =>
    items && items.length
      ? `
      <div class="skill-category">
        <h3>${title}</h3>
        ${items
          .map(
            (s) => `<div class="skill-item"><span>${s.name}</span><span class="skill-level">${s.level}%</span></div>`
          )
          .join('')}
      </div>`
      : '';

  const cvHTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>${personalInfo.name} - CV</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Helvetica', 'Arial', sans-serif; line-height: 1.6; color: #111; padding: 48px; max-width: 880px; margin: 0 auto; background: #fff; }
  h1 { font-size: 36px; font-weight: 700; letter-spacing: -0.02em; margin-bottom: 6px; color: #000; }
  h2 { font-size: 14px; text-transform: uppercase; letter-spacing: 0.2em; color: #555; margin-top: 36px; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 1px solid #ddd; }
  h3 { font-size: 16px; font-weight: 600; color: #000; }
  .contact { color: #555; margin-bottom: 24px; font-size: 14px; }
  .contact p { margin: 2px 0; }
  .item { margin-bottom: 20px; }
  .item-header { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; margin-bottom: 4px; }
  .period { color: #555; font-size: 13px; white-space: nowrap; }
  .status { display: inline-block; background: #f3f3f3; color: #333; padding: 2px 8px; border-radius: 4px; font-size: 11px; margin-top: 4px; }
  .company, .institution { color: #555; font-size: 14px; margin-bottom: 6px; }
  ul { margin-left: 18px; margin-top: 8px; }
  li { margin: 3px 0; font-size: 14px; color: #333; }
  .skills-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
  .skill-category h3 { font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em; color: #555; margin-bottom: 8px; }
  .skill-item { display: flex; justify-content: space-between; padding: 3px 0; font-size: 13px; border-bottom: 1px solid #f0f0f0; }
  .skill-level { color: #000; font-weight: 600; }
  p.summary { font-size: 14px; color: #333; margin-top: 8px; }
</style>
</head>
<body>
  <h1>${personalInfo.name}</h1>
  <div class="contact">
    <p><strong>${personalInfo.title}</strong></p>
    <p>${personalInfo.email} &nbsp;·&nbsp; ${personalInfo.phone} &nbsp;·&nbsp; ${personalInfo.location}</p>
  </div>

  <h2>Experience</h2>
  ${experience
    .map(
      (exp) => `
    <div class="item">
      <div class="item-header"><h3>${exp.position} — ${exp.company}</h3><span class="period">${exp.period}</span></div>
      <p class="summary">${exp.description}</p>
      <ul>${exp.achievements.map((a) => `<li>${a}</li>`).join('')}</ul>
    </div>`
    )
    .join('')}

  <h2>Education</h2>
  ${education
    .map(
      (edu) => `
    <div class="item">
      <div class="item-header"><h3>${edu.degree}</h3><span class="period">${edu.period}</span></div>
      <p class="institution">${edu.institution}</p>
      <span class="status">${edu.status}</span>
    </div>`
    )
    .join('')}

  <h2>Skills</h2>
  <div class="skills-grid">
    ${Object.entries(skills || {})
      .map(([cat, items]) => renderSkillCategory(cat, items as Skill[]))
      .join('')}
  </div>
</body>
</html>`;

  const blob = new Blob([cvHTML], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${personalInfo.name.replace(/\s+/g, '_')}_CV.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
