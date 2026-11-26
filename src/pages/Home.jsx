import { useState } from 'react'
import portrait from '../assets/guilherme.jpg'
import {
  perfil,
  sobre,
  experiencias,
  habilidades,
  formacao,
} from '../data/curriculo'
import './Home.css'

const SECTIONS = [
  { id: 'sobre', label: 'Sobre mim', index: '01' },
  { id: 'experiencia', label: 'Experiência', index: '02' },
  { id: 'habilidades', label: 'Habilidades', index: '03' },
  { id: 'formacao', label: 'Formação', index: '04' },
]

export default function Home() {
  const [active, setActive] = useState(null)

  return (
    <div className={`home ${active ? `home--open home--${active}` : ''}`}>
      <div className="home__media" aria-hidden="true">
        <img src={portrait} alt="" className="home__photo" />
        <div className="home__media-veil" />
      </div>

      <header className="home__top">
        <div className="home__brand">
          <p className="home__role">{perfil.cargo}</p>
          <h1 className="home__name">
            {perfil.nome} {perfil.sobrenome}
          </h1>
        </div>

        <nav className="home__social" aria-label="Atalhos">
          <a
            href={perfil.linkedin}
            target="_blank"
            rel="noreferrer"
            className="home__social-link"
          >
            LinkedIn
          </a>
          <a
            href={perfil.github}
            target="_blank"
            rel="noreferrer"
            className="home__social-link"
          >
            GitHub
          </a>
          <a
            href={perfil.cv}
            download
            className="home__cv"
          >
            Baixar CV
          </a>
        </nav>
      </header>

      <div
        className="home__panels"
        onMouseLeave={() => setActive(null)}
      >
        {SECTIONS.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className={`panel ${active === section.id ? 'panel--active' : ''}`}
            onMouseEnter={() => setActive(section.id)}
            onFocus={() => setActive(section.id)}
            onClick={(e) => {
              if (e.target.closest('a')) return
              setActive((current) =>
                current === section.id ? null : section.id,
              )
            }}
            tabIndex={0}
          >
            <div className="panel__rail">
              <span className="panel__index">{section.index}</span>
              <h2 className="panel__title">{section.label}</h2>
              <span className="panel__hint" aria-hidden="true">
                {active === section.id ? '−' : '+'}
              </span>
            </div>

            <div className="panel__body">
              {section.id === 'sobre' && <SobrePanel />}
              {section.id === 'experiencia' && <ExperienciaPanel />}
              {section.id === 'habilidades' && <HabilidadesPanel />}
              {section.id === 'formacao' && <FormacaoPanel />}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

function SobrePanel() {
  return (
    <div className="panel__inner panel__inner--sobre">
      <p className="panel__pitch">{sobre.pitch}</p>
      <div className="sobre-grid">
        {sobre.diferenciais.map((item) => (
          <article key={item.titulo} className="sobre-card">
            <h3 className="sobre-card__title">{item.titulo}</h3>
            <p className="sobre-card__text">{item.texto}</p>
          </article>
        ))}
      </div>
      <a
        className="panel__cta"
        href={`mailto:${perfil.email}?subject=Contato%20via%20currículo`}
      >
        Iniciar conversa →
      </a>
    </div>
  )
}

function ExperienciaPanel() {
  return (
    <div className="panel__inner panel__inner--timeline">
      {experiencias.map((exp) => (
        <article key={`${exp.empresa}-${exp.periodo}`} className="job">
          <header className="job__head">
            <div>
              <h3 className="job__title">{exp.cargo}</h3>
              <p className="job__meta">
                {exp.empresa} · {exp.periodo}
              </p>
            </div>
          </header>

          <div className="job__points">
            {exp.impactos.map((item) => (
              <div key={item.titulo} className="job__point">
                <strong className="job__point-title">{item.titulo}</strong>
                <p className="job__point-text">{item.texto}</p>
              </div>
            ))}
          </div>

          <div className="job__tags">
            {exp.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </article>
      ))}
    </div>
  )
}

function HabilidadesPanel() {
  return (
    <div className="panel__inner panel__inner--skills">
      {habilidades.map((grupo) => (
        <div key={grupo.titulo} className="skill">
          <h3 className="skill__title">{grupo.titulo}</h3>
          <div className="job__tags">
            {grupo.itens.map((item) => (
              <span key={item} className="tag">
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function FormacaoPanel() {
  return (
    <div className="panel__inner">
      <div className="edu">
        <h3 className="skill__title">Formação acadêmica</h3>
        {formacao.academica.map((item) => (
          <div key={item.curso} className="edu__item">
            <p className="edu__course">{item.curso}</p>
            <p className="edu__meta">
              {item.instituicao} · {item.ano}
            </p>
          </div>
        ))}
      </div>

      <div className="edu">
        <h3 className="skill__title">Certificações</h3>
        <ul className="panel__list">
          {formacao.certificacoes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="edu">
        <h3 className="skill__title">Idiomas</h3>
        <ul className="panel__list">
          {formacao.idiomas.map((item) => (
            <li key={item.idioma}>
              {item.idioma} — {item.nivel}
            </li>
          ))}
        </ul>
      </div>

      <a
        className="panel__cta"
        href={perfil.github}
        target="_blank"
        rel="noreferrer"
      >
        Ver GitHub ↗
      </a>
    </div>
  )
}
