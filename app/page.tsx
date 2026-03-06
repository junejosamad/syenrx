"use client"

import { useState } from "react"
import { RegistrationModal } from "@/components/modals/registration-modal"

export default function Home() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)

  const openRegister = () => setIsRegisterOpen(true)
  const closeRegister = () => setIsRegisterOpen(false)

  return (
    <div className="bg-background-light dark:bg-background-dark text-text-main font-body antialiased overflow-x-hidden relative">


      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/30 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#CDC1FF] rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob "></div>
        <div className="absolute -bottom-32 left-1/3 w-[500px] h-[500px] bg-primary-light rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob "></div>
      </div>

      <nav className="fixed top-0 w-full z-50 transition-all duration-300 backdrop-blur-xl bg-white/60 border-b border-white/30">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-xl">bolt</span>
            </div>
            <span className="font-display font-bold text-2xl tracking-tight text-text-main">SynerX</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a className="text-sm font-medium text-text-main hover:text-primary transition-colors" href="/#home">Home</a>
            <a className="text-sm font-medium text-text-main hover:text-primary transition-colors" href="/#competitions">Competitions</a>
            <a className="text-sm font-medium text-text-main hover:text-primary transition-colors" href="/#schedule">Schedule</a>
            <a className="text-sm font-medium text-text-main hover:text-primary transition-colors" href="/#speakers">Speakers</a>
            <a className="text-sm font-medium text-text-main hover:text-primary transition-colors" href="/#sponsors">Sponsors</a>
          </div>
          <a href="/auth/register" className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95">
            Register
          </a>
        </div>
      </nav>

      <main className="relative z-10 flex flex-col items-center w-full">

        <section className="min-h-screen flex flex-col justify-center items-center pt-24 px-6 w-full max-w-7xl mx-auto text-center">
          <div className="space-y-6 max-w-4xl mx-auto animate-float">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/50 backdrop-blur-sm border border-white/60 shadow-sm mb-4">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">Live Registration Open</span>
            </div>
            <h1 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[1.1] text-text-main">
              SynerX 2026: <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#CDC1FF]">Next Gen Convergence</span>
            </h1>
            <p className="text-lg md:text-xl text-text-muted font-normal max-w-2xl mx-auto">
              Hackathons • Competitions • Workshops • Startup Arena <br />
              The digital gateway to Pakistan's premier tech event.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button onClick={openRegister} className="w-full sm:w-auto min-w-[160px] h-14 bg-primary text-white rounded-xl font-bold text-lg shadow-[0_4px_14px_0_rgba(107,86,245,0.39)] hover:shadow-[0_6px_20px_rgba(107,86,245,0.23)] hover:bg-primary-dark transition-all transform hover:-translate-y-1">
                Register Now
              </button>
              <a href="#schedule" className="flex items-center justify-center w-full sm:w-auto min-w-[160px] h-14 glass-card text-text-main rounded-xl font-bold text-lg border border-primary/20 hover:border-primary/50 transition-all transform hover:-translate-y-1">
                View Schedule
              </a>
            </div>
          </div>

          <div className="mt-20 p-6 glass-card rounded-2xl w-full max-w-3xl border border-white/60 shadow-xl shadow-primary/5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x-0 md:divide-x divide-primary/10">
              <div className="flex flex-col">
                <span className="font-mono text-4xl md:text-5xl font-bold text-text-main">14</span>
                <span className="text-xs uppercase tracking-widest text-text-muted mt-2">Days</span>
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-4xl md:text-5xl font-bold text-text-main">06</span>
                <span className="text-xs uppercase tracking-widest text-text-muted mt-2">Hours</span>
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-4xl md:text-5xl font-bold text-text-main">32</span>
                <span className="text-xs uppercase tracking-widest text-text-muted mt-2">Minutes</span>
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-4xl md:text-5xl font-bold text-primary">15</span>
                <span className="text-xs uppercase tracking-widest text-text-muted mt-2">Seconds</span>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full max-w-7xl mx-auto px-6 py-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <div className="glass-card p-8 rounded-2xl group hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden">
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors"></div>
              <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl">lightbulb</span>
              </div>
              <h3 className="font-display font-bold text-2xl mb-3 text-text-main">Innovation Labs</h3>
              <p className="text-text-muted leading-relaxed">
                Hands-on workshops with industry leaders exploring the boundaries of Generative AI and Quantum Computing.
              </p>
            </div>

            <div className="glass-card p-8 rounded-2xl group hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden">
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors"></div>
              <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl">groups</span>
              </div>
              <h3 className="font-display font-bold text-2xl mb-3 text-text-main">Networking</h3>
              <p className="text-text-muted leading-relaxed">
                Connect with 2000+ developers, founders, and VCs in our dedicated networking lounges and speed-dating sessions.
              </p>
            </div>

            <div className="glass-card p-8 rounded-2xl group hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden">
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors"></div>
              <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl">trophy</span>
              </div>
              <h3 className="font-display font-bold text-2xl mb-3 text-text-main">Awards Night</h3>
              <p className="text-text-muted leading-relaxed">
                Celebrating the brightest minds with our prestigious SynerX Awards ceremony closing the event.
              </p>
            </div>
          </div>
        </section>

        <section className="w-full max-w-7xl mx-auto px-6 py-24" id="competitions">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <h2 className="font-display font-bold text-4xl md:text-5xl text-text-main mb-4">Compete &amp; Win</h2>
              <p className="text-text-muted text-lg max-w-md">Prove your skills in our diverse range of challenges.</p>
            </div>
            <a className="hidden md:flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all" href="/events">
              View All Challenges <span className="material-symbols-outlined">arrow_forward</span>
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">


            <div className="glass-card p-6 rounded-2xl border border-white/50 hover:border-primary transition-all hover:shadow-[0_0_30px_-5px_rgba(107,86,245,0.3)] hover:scale-[1.02] group cursor-pointer">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-white/60 rounded-xl backdrop-blur-sm">
                  <span className="material-symbols-outlined text-primary text-2xl">code</span>
                </div>
                <span className="font-mono text-xs font-bold bg-primary/10 text-primary px-3 py-1 rounded-full">10k Pool</span>
              </div>
              <h4 className="font-display font-bold text-xl mb-2 group-hover:text-primary transition-colors">Global Hackathon</h4>
              <p className="text-sm text-text-muted mb-4">48-hour intense coding marathon solving real-world problems.</p>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-white/50 hover:border-primary transition-all hover:shadow-[0_0_30px_-5px_rgba(107,86,245,0.3)] hover:scale-[1.02] group cursor-pointer">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-white/60 rounded-xl backdrop-blur-sm">
                  <span className="material-symbols-outlined text-primary text-2xl">psychology</span>
                </div>
                <span className="font-mono text-xs font-bold bg-primary/10 text-primary px-3 py-1 rounded-full">5k Pool</span>
              </div>
              <h4 className="font-display font-bold text-xl mb-2 group-hover:text-primary transition-colors">AI Challenge</h4>
              <p className="text-sm text-text-muted mb-4">Build and deploy cutting-edge ML models on the fly.</p>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-white/50 hover:border-primary transition-all hover:shadow-[0_0_30px_-5px_rgba(107,86,245,0.3)] hover:scale-[1.02] group cursor-pointer">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-white/60 rounded-xl backdrop-blur-sm">
                  <span className="material-symbols-outlined text-primary text-2xl">terminal</span>
                </div>
                <span className="font-mono text-xs font-bold bg-primary/10 text-primary px-3 py-1 rounded-full">3k Pool</span>
              </div>
              <h4 className="font-display font-bold text-xl mb-2 group-hover:text-primary transition-colors">Speed Programming</h4>
              <p className="text-sm text-text-muted mb-4">Algorithmic puzzles solved against the clock.</p>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-white/50 hover:border-primary transition-all hover:shadow-[0_0_30px_-5px_rgba(107,86,245,0.3)] hover:scale-[1.02] group cursor-pointer">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-white/60 rounded-xl backdrop-blur-sm">
                  <span className="material-symbols-outlined text-primary text-2xl">sports_esports</span>
                </div>
                <span className="font-mono text-xs font-bold bg-primary/10 text-primary px-3 py-1 rounded-full">8k Pool</span>
              </div>
              <h4 className="font-display font-bold text-xl mb-2 group-hover:text-primary transition-colors">Game Dev Arena</h4>
              <p className="text-sm text-text-muted mb-4">Create immersive experiences in 72 hours.</p>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-white/50 hover:border-primary transition-all hover:shadow-[0_0_30px_-5px_rgba(107,86,245,0.3)] hover:scale-[1.02] group cursor-pointer">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-white/60 rounded-xl backdrop-blur-sm">
                  <span className="material-symbols-outlined text-primary text-2xl">palette</span>
                </div>
                <span className="font-mono text-xs font-bold bg-primary/10 text-primary px-3 py-1 rounded-full">2k Pool</span>
              </div>
              <h4 className="font-display font-bold text-xl mb-2 group-hover:text-primary transition-colors">UI/UX Design</h4>
              <p className="text-sm text-text-muted mb-4">Redefine user experiences with modern interfaces.</p>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-white/50 hover:border-primary transition-all hover:shadow-[0_0_30px_-5px_rgba(107,86,245,0.3)] hover:scale-[1.02] group cursor-pointer">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-white/60 rounded-xl backdrop-blur-sm">
                  <span className="material-symbols-outlined text-primary text-2xl">rocket_launch</span>
                </div>
                <span className="font-mono text-xs font-bold bg-primary/10 text-primary px-3 py-1 rounded-full">20k Investment</span>
              </div>
              <h4 className="font-display font-bold text-xl mb-2 group-hover:text-primary transition-colors">Startup Pitch</h4>
              <p className="text-sm text-text-muted mb-4">Pitch your next big idea to angel investors.</p>
            </div>
          </div>
          <div className="mt-8 flex justify-center md:hidden">
            <a className="flex items-center gap-2 text-primary font-bold" href="/events">
              View All Challenges <span className="material-symbols-outlined">arrow_forward</span>
            </a>
          </div>
        </section>

        <section className="w-full bg-white border-y border-gray-200">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200 border-x border-gray-200">
              <div className="p-12 md:p-16 text-center kinetic-grid-item cursor-default group">
                <h3 className="font-display font-bold text-5xl md:text-6xl text-primary mb-2 group-hover:scale-110 transition-transform duration-300">2000+</h3>
                <p className="text-text-muted font-medium text-lg">Participants</p>
              </div>
              <div className="p-12 md:p-16 text-center kinetic-grid-item cursor-default group">
                <h3 className="font-display font-bold text-5xl md:text-6xl text-primary mb-2 group-hover:scale-110 transition-transform duration-300">40+</h3>
                <p className="text-text-muted font-medium text-lg">Competitions</p>
              </div>
              <div className="p-12 md:p-16 text-center kinetic-grid-item cursor-default group">
                <h3 className="font-display font-bold text-5xl md:text-6xl text-primary mb-2 group-hover:scale-110 transition-transform duration-300">50k</h3>
                <p className="text-text-muted font-medium text-lg">Prize Pool</p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full max-w-7xl mx-auto px-6 py-24 overflow-hidden" id="speakers">
          <div className="mb-12">
            <h2 className="font-display font-bold text-4xl text-text-main mb-4">Industry Leaders</h2>
            <p className="text-text-muted">Learn from the pioneers shaping the future.</p>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-12 snap-x snap-mandatory">

            <div className="glass-card min-w-[280px] p-6 rounded-2xl flex flex-col items-center text-center snap-center hover:-translate-y-2 transition-transform duration-300 group cursor-pointer border border-white/40">
              <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-primary to-[#CDC1FF] mb-4 group-hover:shadow-lg transition-shadow">
                <img alt="Sarah Chen profile picture" className="w-full h-full object-cover rounded-full border-2 border-white" data-alt="Portrait of Sarah Chen, Senior Engineer at Google" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJFPgBI74mromYLwnB8rZxrMuMQ-1iNQwJwnXIM6t4_S69RsB7alxVwiFpdxH_hhWMIlu2zgPPhaCls9q4ZiX8TfCqa6rhTaj-yMQ6jv2t45IpWquvHTjd9zKcTeIMR6qMXeC9JoX0utUkdW7im93pPBCvmVCv-6eCSMJKCBlcRiPehD0y969N2zB2kmTB68VWwnzmWc7VRkhGwh0-pVOT9RxKvatw4tvaULzpowVRBTCaUVxopCEzFXE64tXPgZIjHSBjDYGM0CRo" />
              </div>
              <h3 className="font-display font-bold text-xl text-text-main">Sarah Chen</h3>
              <p className="text-sm text-primary font-medium mb-3">Senior Engineer @ Google</p>
              <span className="px-3 py-1 bg-primary/5 text-primary text-xs rounded-full font-mono">AI Ethics</span>
            </div>

            <div className="glass-card min-w-[280px] p-6 rounded-2xl flex flex-col items-center text-center snap-center hover:-translate-y-2 transition-transform duration-300 group cursor-pointer border border-white/40">
              <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-primary to-[#CDC1FF] mb-4 group-hover:shadow-lg transition-shadow">
                <img alt="Marcus Johnson profile picture" className="w-full h-full object-cover rounded-full border-2 border-white" data-alt="Portrait of Marcus Johnson, CTO at TechStream" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1_inHRX8tBYs9WZFIqnCBDBsRCtwqfLZ1YTNVNvDS-NiziTJ38p6FPwNRxlpkRPFriWKfxtwVF1yr7bBFWth5bKJOzl5Vtj4HGVX39-9OozS-hZMJOiK0tLkEtyp1sByfSDRZdcDwGvQtqjb6iFwbiEjWdxuznbyAH_FdiZSNgyfQKT1dd12eBlYvbvVo1KkjKiAvsqqbORXwDMufQpva7vXc83EbrqncRGR67DDtbh9ZU1OCkVpcdPqPWdzO9jhIJKD70qUf9Ue9" />
              </div>
              <h3 className="font-display font-bold text-xl text-text-main">Marcus Johnson</h3>
              <p className="text-sm text-primary font-medium mb-3">CTO @ TechStream</p>
              <span className="px-3 py-1 bg-primary/5 text-primary text-xs rounded-full font-mono">Cloud Scale</span>
            </div>

            <div className="glass-card min-w-[280px] p-6 rounded-2xl flex flex-col items-center text-center snap-center hover:-translate-y-2 transition-transform duration-300 group cursor-pointer border border-white/40">
              <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-primary to-[#CDC1FF] mb-4 group-hover:shadow-lg transition-shadow">
                <img alt="Elena Rodriguez profile picture" className="w-full h-full object-cover rounded-full border-2 border-white" data-alt="Portrait of Elena Rodriguez, Design Lead at Spotify" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzq66qNwnXHmlx_OHDPtlVS4PTG3o4O2CHYanGT7lIOnkh_Ta_a5RJFMIWJNTKs7oCQp5EyBBnZI1szu6NqaSTVEXSCElWUh9pznze0CAVWBMfArCGFcvByKsENteFwdFq2sEecq9_ynocLDqttogyyPDAI26E-uk81cdgySYr3B-31YPZhSu2J9Rm1W9pCB6LH9EY1_3f2Wy_d6sCT8KLcgVoG2Eugvh6Ta41VvhZmvadv8VO17IPEUlCdrMee-x0bcnC8pPV1Aal" />
              </div>
              <h3 className="font-display font-bold text-xl text-text-main">Elena Rodriguez</h3>
              <p className="text-sm text-primary font-medium mb-3">Design Lead @ Spotify</p>
              <span className="px-3 py-1 bg-primary/5 text-primary text-xs rounded-full font-mono">Product Design</span>
            </div>

            <div className="glass-card min-w-[280px] p-6 rounded-2xl flex flex-col items-center text-center snap-center hover:-translate-y-2 transition-transform duration-300 group cursor-pointer border border-white/40">
              <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-primary to-[#CDC1FF] mb-4 group-hover:shadow-lg transition-shadow">
                <img alt="David Park profile picture" className="w-full h-full object-cover rounded-full border-2 border-white" data-alt="Portrait of David Park, Founder at BlockChainz" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAn9LOuzW0z57mxsTokuxUuXHDRZ_Rzl8--i2bzD96XyRR_GRwj0suXL3SzK5lG_rjtb0T8RxoLGDQ-r-npFU1g1vPvkJQ6KFXbUOOJV-U5D2pfly94aFV0pLYv4EZ6mOszRym7G3tWXrowOwnqHGWa91tj7IvkCf2u4lWDnHOErhQmGFeWFCW5wZ7tQfd39l2IF6g2KkSKYYbCE67EStqOYGHi9Mpm7iBLGfQAiJ5JxAIe0VTLSTsuyku7EnV0W0e0Zp35uxu67ixm" />
              </div>
              <h3 className="font-display font-bold text-xl text-text-main">David Park</h3>
              <p className="text-sm text-primary font-medium mb-3">Founder @ BlockChainz</p>
              <span className="px-3 py-1 bg-primary/5 text-primary text-xs rounded-full font-mono">Web3 &amp; DeFi</span>
            </div>

            <div className="glass-card min-w-[280px] p-6 rounded-2xl flex flex-col items-center text-center snap-center hover:-translate-y-2 transition-transform duration-300 group cursor-pointer border border-white/40">
              <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-primary to-[#CDC1FF] mb-4 group-hover:shadow-lg transition-shadow">
                <img alt="Anita Raj profile picture" className="w-full h-full object-cover rounded-full border-2 border-white" data-alt="Portrait of Anita Raj, AI Researcher" src="https://lh3.googleusercontent.com/aida-public/AB6AXuARCAlJWI6yICLCIiJ-RjNSzmNBpbqBbpoXNqHJONZMkx4IUI9FLnnBsYCbXC4BceSbGicGG78pYHIvoDn-XLvOpRyuOyc12V75Hf9eaSkYnLjz1t808tr9bYGg1qzVnH85O1F0tafL7Zq7oAQjkQxbq891FZwSc5BLMe_zwl9tuAvU9_YlhP5TthPPkrWqbxuf_efbjUoGe8zXAnbIIiyYDBxm3gIbb7_zb4Oieoc6oC26KBiLzusyKT7MRpH2NwtUPy8RCZh0Nkdv" />
              </div>
              <h3 className="font-display font-bold text-xl text-text-main">Anita Raj</h3>
              <p className="text-sm text-primary font-medium mb-3">AI Researcher @ OpenAI</p>
              <span className="px-3 py-1 bg-primary/5 text-primary text-xs rounded-full font-mono">LLMs</span>
            </div>
          </div>
        </section>

        <section className="w-full max-w-5xl mx-auto px-6 py-24" id="schedule">
          <h2 className="font-display font-bold text-4xl text-text-main mb-16 text-center">Event Timeline</h2>
          <div className="relative">

            <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-primary/20 md:left-1/2 md:-ml-0.5"></div>
            <div className="space-y-12">

              <div className="relative flex flex-col md:flex-row items-start md:items-center w-full group">

                <div className="absolute left-0 w-10 h-10 flex items-center justify-center bg-background-light md:left-1/2 md:-ml-5 z-10">
                  <div className="w-3 h-3 bg-primary rounded-full ring-4 ring-primary/20 group-hover:ring-primary/40 transition-all"></div>
                </div>

                <div className="pl-12 md:pl-0 md:pr-12 md:w-1/2 md:text-right mb-2 md:mb-0">
                  <span className="font-mono text-primary font-bold text-lg">09:00 AM</span>
                </div>

                <div className="pl-12 md:pl-12 md:w-1/2">
                  <div className="glass-card p-5 rounded-xl border border-white/50 hover:border-primary/50 transition-all hover:-translate-y-1 hover:shadow-lg">
                    <h4 className="font-bold text-lg text-text-main">Opening Ceremony</h4>
                    <p className="text-sm text-text-muted mt-1">Keynote by SynerX Founders &amp; Special Guests</p>
                  </div>
                </div>
              </div>

              <div className="relative flex flex-col md:flex-row items-start md:items-center w-full group">

                <div className="absolute left-0 w-10 h-10 flex items-center justify-center bg-background-light md:left-1/2 md:-ml-5 z-10">
                  <div className="w-3 h-3 bg-white border-2 border-primary rounded-full group-hover:bg-primary transition-all"></div>
                </div>

                <div className="pl-12 md:pl-0 md:pr-12 md:w-1/2 md:text-right order-2 md:order-1">
                  <div className="glass-card p-5 rounded-xl border border-white/50 hover:border-primary/50 transition-all hover:-translate-y-1 hover:shadow-lg text-left md:text-right">
                    <h4 className="font-bold text-lg text-text-main">Hackathon Kickoff</h4>
                    <p className="text-sm text-text-muted mt-1">Theme announcement and team formation.</p>
                    <div className="flex items-center gap-2 mt-3 md:justify-end">
                      <img alt="Speaker avatar" className="w-6 h-6 rounded-full object-cover" data-alt="Small avatar of Marcus Johnson" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtfxsxLsRgkzxSFq4K85c79jstcucl1Z_pkXYhc6ZjbK_aQlODslp7VOnfingBVVL6zKJ_Ecw025LWpo_K3gWTSPgk8EV-bzhWPzPi93sP7abcJQgSfOmvUcFyES19m5nEO-gNHO7aRB1Y4yZi166pqdPHeJobWJAfH6Afp8Hc9qVrrN2sYcNH6-bOJGY2dgQ0dyvNwsUsmiHWoist9SV2cAw_xheXw4qQMGNcwwu1SKrGi9YyQlPMblFPRTl5GlS4PPVB701WAAjt" />
                      <span className="text-xs font-medium">Marcus Johnson</span>
                    </div>
                  </div>
                </div>

                <div className="pl-12 md:pl-12 md:w-1/2 order-1 md:order-2 mb-2 md:mb-0">
                  <span className="font-mono text-text-main font-bold text-lg">11:00 AM</span>
                </div>
              </div>

              <div className="relative flex flex-col md:flex-row items-start md:items-center w-full group">

                <div className="absolute left-0 w-10 h-10 flex items-center justify-center bg-background-light md:left-1/2 md:-ml-5 z-10">
                  <div className="w-3 h-3 bg-white border-2 border-primary rounded-full group-hover:bg-primary transition-all"></div>
                </div>

                <div className="pl-12 md:pl-0 md:pr-12 md:w-1/2 md:text-right mb-2 md:mb-0">
                  <span className="font-mono text-text-main font-bold text-lg">02:00 PM</span>
                </div>

                <div className="pl-12 md:pl-12 md:w-1/2">
                  <div className="glass-card p-5 rounded-xl border border-white/50 hover:border-primary/50 transition-all hover:-translate-y-1 hover:shadow-lg">
                    <h4 className="font-bold text-lg text-text-main">The Future of AI</h4>
                    <p className="text-sm text-text-muted mt-1">Panel discussion with leading AI researchers.</p>
                    <div className="flex items-center gap-2 mt-3">
                      <img alt="Speaker avatar" className="w-6 h-6 rounded-full object-cover" data-alt="Small avatar of Sarah Chen" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIPHfIj4dhP_BDO2xk5tGUGUy30TQ_-hgVtDglmgwauhq23hBE64P7YxhUTfgDg67GlkT0PkIg7eMRuf2QETFcR3b_UHsVSbh9yfG2-4rnyDWgCJIIpSpNqAy9lq1cQHuk-A6rszLbEKIZ2WfAdHZmPrXhdCHok8p3Tb-KFwLB48BA3f9rJfLWHUNVfmmPKZqR-gudROl2HJ24k0h2ga3J0Z10KmW9SEexzX9-M4mQ2C0bhnzgUamm-U4OVDa-Gi68MbFD-6nONhEm" />
                      <span className="text-xs font-medium">Sarah Chen</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative flex flex-col md:flex-row items-start md:items-center w-full group">

                <div className="absolute left-0 w-10 h-10 flex items-center justify-center bg-background-light md:left-1/2 md:-ml-5 z-10">
                  <div className="w-3 h-3 bg-white border-2 border-primary rounded-full group-hover:bg-primary transition-all"></div>
                </div>

                <div className="pl-12 md:pl-0 md:pr-12 md:w-1/2 md:text-right order-2 md:order-1">
                  <div className="glass-card p-5 rounded-xl border border-white/50 hover:border-primary/50 transition-all hover:-translate-y-1 hover:shadow-lg text-left md:text-right">
                    <h4 className="font-bold text-lg text-text-main">VC Pitch Hour</h4>
                    <p className="text-sm text-text-muted mt-1">Selected startups present to top-tier investors.</p>
                  </div>
                </div>

                <div className="pl-12 md:pl-12 md:w-1/2 order-1 md:order-2 mb-2 md:mb-0">
                  <span className="font-mono text-text-main font-bold text-lg">05:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full max-w-7xl mx-auto px-6 py-16 opacity-70 hover:opacity-100 transition-opacity" id="sponsors">
          <p className="text-center text-sm font-semibold text-text-muted uppercase tracking-widest mb-8">Trusted by Industry Leaders</p>
          <div className="flex flex-wrap justify-center gap-12 items-center grayscale hover:grayscale-0 transition-all duration-500">
            <div className="h-8 font-display font-bold text-2xl text-text-muted">GOOGLE</div>
            <div className="h-8 font-display font-bold text-2xl text-text-muted">MICROSOFT</div>
            <div className="h-8 font-display font-bold text-2xl text-text-muted">SPOTIFY</div>
            <div className="h-8 font-display font-bold text-2xl text-text-muted">NOTION</div>
            <div className="h-8 font-display font-bold text-2xl text-text-muted">AIRBNB</div>
          </div>
        </section>

        <section className="w-full px-6 py-24 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 -z-10"></div>
          <div className="max-w-2xl mx-auto glass-card p-12 rounded-3xl border border-white/60 shadow-2xl">
            <h2 className="font-display font-bold text-4xl mb-6">Ready to Shape the Future?</h2>
            <p className="text-text-muted text-lg mb-8">Join the movement. Secure your spot at SynerX 2026 before tickets run out.</p>
            <a href="/auth/register" className="w-full sm:w-auto px-10 py-4 bg-primary text-white rounded-xl font-bold text-lg shadow-[0_4px_14px_0_rgba(107,86,245,0.39)] hover:bg-primary-dark transition-all transform hover:scale-105">
              Get Your Ticket
            </a>
          </div>
        </section>

        <footer className="w-full bg-white/40 border-t border-white/50 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">bolt</span>
              <span className="font-display font-bold text-lg text-text-main">SynerX</span>
            </div>
            <div className="flex gap-6 text-sm text-text-muted font-medium">
              <a className="hover:text-primary transition-colors" href="/">Code of Conduct</a>
              <a className="hover:text-primary transition-colors" href="/">Privacy Policy</a>
              <a className="hover:text-primary transition-colors" href="/">Contact</a>
            </div>
            <div className="text-sm text-text-muted">
              © 2026 SynerX Events. All rights reserved.
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
