import re

with open('components/code.html', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace('class=', 'className=')
text = text.replace('for=', 'htmlFor=')
text = re.sub(r'<!--.*?-->', '', text, flags=re.DOTALL)

body_match = re.search(r'<body[^>]*>(.*?)</body>', text, re.DOTALL | re.IGNORECASE)
body_content = body_match.group(1) if body_match else ''
body_content = re.sub(r'<br>', '<br/>', body_content, flags=re.IGNORECASE)

# Fix open tags
def close_tag(match):
    s = match.group(0)
    if not s.endswith('/>'):
        return s[:-1] + '/>'
    return s

body_content = re.sub(r'<img[^>]*>', close_tag, body_content, flags=re.IGNORECASE)
body_content = re.sub(r'<input[^>]*>', close_tag, body_content, flags=re.IGNORECASE)

# Clean animation delays
body_content = body_content.replace('animation-delay-2000', '')
body_content = body_content.replace('animation-delay-4000', '')

# Apply correct inline style for the specific blobs
lines = body_content.split('\n')
new_lines = []
for line in lines:
    if 'mix-blend-multiply' in line:
        if 'bg-[#CDC1FF]' in line:
            line = line.replace('animate-blob"', 'animate-blob" style={{ animationDelay: \'2s\' }}')
        elif 'bg-primary-light' in line:
            line = line.replace('animate-blob"', 'animate-blob" style={{ animationDelay: \'4s\' }}')
    new_lines.append(line)

new_body_content = '\n'.join(new_lines)

# Inject openRegister onto all components containing 'Register' text that are buttons
new_body_content = re.sub(r'(<button[^>]*>.*?Register.*?</button>)', 
  lambda m: m.group(0).replace('<button', '<button onClick={openRegister}'), 
  new_body_content, flags=re.IGNORECASE | re.DOTALL)

# Add correct Links for href="#"
new_body_content = new_body_content.replace('href="#"', 'href="/"')

final_code = f'''"use client"

import {{ useState }} from "react"
import {{ RegistrationModal }} from "@/components/modals/registration-modal"

export default function Home() {{
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)

  const openRegister = () => setIsRegisterOpen(true)
  const closeRegister = () => setIsRegisterOpen(false)

  return (
    <div className="bg-background-light dark:bg-background-dark text-text-main font-body antialiased overflow-x-hidden relative">
      {new_body_content}
      <RegistrationModal isOpen={{isRegisterOpen}} onClose={{closeRegister}} />
    </div>
  )
}}
'''

with open('app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(final_code)
print('Done!')
