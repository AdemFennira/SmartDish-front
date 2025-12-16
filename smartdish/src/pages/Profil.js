import React, { useMemo, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Profil.css";

export default function Profile() {
  const tabs = useMemo(
    () => [
      { key: "profil", label: "Profil" },
      { key: "preferences", label: "Préférences" },
      { key: "activite", label: "Activité" },
      { key: "parametres", label: "Paramètres" },
    ],
    []
  );

  const [active, setActive] = useState("profil");
  const [editProfile, setEditProfile] = useState(false);

  // --- MOCK DATA (tu remplaceras par ton fetch /api/users/me) ---
  const [user, setUser] = useState({
    fullName: "Marie Dubois",
    email: "marie.dubois@email.com",
    phone: "+33 6 12 34 56 78",
    location: "Paris, France",
    bio:
      "Passionnée de cuisine depuis toujours, j'adore découvrir de nouvelles recettes et partager mes créations culinaires.",
    memberSince: "Janvier 2024",
  });

  const stats = useMemo(
    () => ({
      cooked: 47,
      favorites: 23,
      avgRating: 4.6,
      totalTime: "18h 30min",
    }),
    []
  );

  const [prefs, setPrefs] = useState({
    diet: ["Végétarien"],
    allergies: ["Arachide"],
    cuisines: ["Italien", "Français", "Asiatique"],
    level: "Intermédiaire",
    cookTime: "30-45 min",
  });

  const activity = useMemo(
    () => [
      { type: "cooked", title: 'A cuisiné "Risotto aux champignons"', when: "Il y a 2 jours", rating: 5 },
      { type: "fav", title: 'A ajouté aux favoris "Salade de quinoa colorée"', when: "Il y a 3 jours" },
      { type: "cooked", title: 'A cuisiné "Curry de légumes épicé"', when: "Il y a 1 semaine", rating: 4 },
      { type: "fav", title: 'A ajouté aux favoris "Saumon grillé aux herbes"', when: "Il y a 1 semaine" },
    ],
    []
  );

  const [settings, setSettings] = useState({
    newRecipes: true,
    reminders: true,
    newsletter: false,
    publicProfile: false,
    shareRecipes: true,
  });

  // --- helpers chips ---
  const removeChip = (groupKey, value) => {
    setPrefs((p) => ({ ...p, [groupKey]: p[groupKey].filter((x) => x !== value) }));
  };

  const addChip = (groupKey) => {
    const label = window.prompt("Ajouter :");
    if (!label) return;
    setPrefs((p) => ({ ...p, [groupKey]: Array.from(new Set([...p[groupKey], label])) }));
  };

  // --- profil edit/save (front only) ---
  const [draft, setDraft] = useState(user);

  const startEdit = () => {
    setDraft(user);
    setEditProfile(true);
  };

  const cancelEdit = () => {
    setDraft(user);
    setEditProfile(false);
  };

  const saveEdit = () => {
    setUser(draft);
    setEditProfile(false);
    // plus tard: appeler PUT /api/users/me
  };

  return (
    <div className="profilePage">
      <div className="profileHeader">
        <h1>Gérez votre profil et vos préférences culinaires</h1>

        <div className="tabs">
          {tabs.map((t) => (
            <button
              key={t.key}
              className={`tab ${active === t.key ? "active" : ""}`}
              onClick={() => setActive(t.key)}
              type="button"
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="profileBody">
        {active === "profil" && (
          <div className="grid2">
            {/* Left card */}
            <section className="card">
              <div className="cardHeader">
                <h2>Informations personnelles</h2>
                {!editProfile ? (
                  <button className="btnGhost" onClick={startEdit} type="button">
                    Modifier
                  </button>
                ) : (
                  <div className="btnRow">
                    <button className="btnGhost" onClick={cancelEdit} type="button">
                      Annuler
                    </button>
                    <button className="btnPrimary" onClick={saveEdit} type="button">
                      Enregistrer
                    </button>
                  </div>
                )}
              </div>

              <div className="userTop">
                <div className="avatar" aria-hidden="true">👤</div>
                <div>
                  <div className="userName">{user.fullName}</div>
                  <div className="muted">Membre depuis {user.memberSince}</div>
                </div>
              </div>

              <div className="formGrid">
                <Field
                  label="Nom complet"
                  icon="👤"
                  value={editProfile ? draft.fullName : user.fullName}
                  disabled={!editProfile}
                  onChange={(v) => setDraft((d) => ({ ...d, fullName: v }))}
                />
                <Field
                  label="Email"
                  icon="✉️"
                  value={editProfile ? draft.email : user.email}
                  disabled={!editProfile}
                  onChange={(v) => setDraft((d) => ({ ...d, email: v }))}
                />
                <Field
                  label="Téléphone"
                  icon="📞"
                  value={editProfile ? draft.phone : user.phone}
                  disabled={!editProfile}
                  onChange={(v) => setDraft((d) => ({ ...d, phone: v }))}
                />
                <Field
                  label="Localisation"
                  icon="📍"
                  value={editProfile ? draft.location : user.location}
                  disabled={!editProfile}
                  onChange={(v) => setDraft((d) => ({ ...d, location: v }))}
                />

                <div className="field col2">
                  <div className="fieldLabel">Bio</div>
                  <textarea
                    className="textarea"
                    value={editProfile ? draft.bio : user.bio}
                    disabled={!editProfile}
                    onChange={(e) => setDraft((d) => ({ ...d, bio: e.target.value }))}
                    rows={3}
                  />
                </div>
              </div>
            </section>

            {/* Right card */}
            <section className="card">
              <div className="cardHeader">
                <h2>🏆 Mes statistiques</h2>
              </div>

              <div className="statBig">
                <div className="statBigNum">{stats.cooked}</div>
                <div className="muted">Recettes cuisinées</div>
              </div>

              <div className="statRow">
                <div className="statSmall">
                  <div className="statSmallNum">{stats.favorites}</div>
                  <div className="muted">Favoris</div>
                </div>
                <div className="statSmall">
                  <div className="statSmallNum">{stats.avgRating}</div>
                  <div className="muted">Note moyenne</div>
                </div>
              </div>

              <div className="statWide">
                <div className="statWideNum">{stats.totalTime}</div>
                <div className="muted">Temps de cuisine total</div>
              </div>
            </section>
          </div>
        )}

        {active === "preferences" && (
          <div className="grid2">
            <section className="card">
              <div className="cardHeader">
                <h2>Préférences alimentaires</h2>
              </div>

              <Group
                title="Régime alimentaire"
                chips={prefs.diet}
                onRemove={(v) => removeChip("diet", v)}
                onAdd={() => addChip("diet")}
                chipTone="green"
              />

              <Group
                title="Allergies"
                chips={prefs.allergies}
                onRemove={(v) => removeChip("allergies", v)}
                onAdd={() => addChip("allergies")}
                chipTone="red"
              />

              <Group
                title="Types de cuisine préférés"
                chips={prefs.cuisines}
                onRemove={(v) => removeChip("cuisines", v)}
                onAdd={() => addChip("cuisines")}
                chipTone="beige"
              />
            </section>

            <section className="card">
              <div className="cardHeader">
                <h2>Préférences de cuisine</h2>
              </div>

              <div className="kv">
                <div className="kvLabel">Niveau de compétence</div>
                <div className="pill">👨‍🍳 {prefs.level}</div>
              </div>

              <div className="kv">
                <div className="kvLabel">Temps de cuisine préféré</div>
                <div className="pill">⏱️ {prefs.cookTime}</div>
              </div>

              <button className="btnSuccess" type="button">
                ⚙️ Modifier les préférences
              </button>
            </section>
          </div>
        )}

        {active === "activite" && (
          <section className="card">
            <div className="cardHeader">
              <h2>Activité récente</h2>
            </div>

            <div className="activityList">
              {activity.map((a, idx) => (
                <div className="activityItem" key={idx}>
                  <div className={`bubble ${a.type === "fav" ? "pink" : "mint"}`}>
                    {a.type === "fav" ? "❤️" : "🧑‍🍳"}
                  </div>

                  <div className="activityText">
                    <div className="activityTitle">{a.title}</div>
                    <div className="muted">{a.when}</div>
                  </div>

                  {typeof a.rating === "number" && (
                    <div className="rating">
                      ⭐ {a.rating}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {active === "parametres" && (
          <div className="grid2">
            <section className="card">
              <div className="cardHeader">
                <h2>Notifications</h2>
              </div>

              <SettingRow
                title="Nouvelles recettes"
                desc="Recevoir des suggestions personnalisées"
                value={settings.newRecipes}
                onToggle={() => setSettings((s) => ({ ...s, newRecipes: !s.newRecipes }))}
              />
              <SettingRow
                title="Rappels de cuisine"
                desc="Notifications pour vos recettes planifiées"
                value={settings.reminders}
                onToggle={() => setSettings((s) => ({ ...s, reminders: !s.reminders }))}
              />
              <SettingRow
                title="Newsletter"
                desc="Conseils et astuces culinaires"
                value={settings.newsletter}
                onToggle={() => setSettings((s) => ({ ...s, newsletter: !s.newsletter }))}
              />
            </section>

            <section className="card">
              <div className="cardHeader">
                <h2>Confidentialité</h2>
              </div>

              <SettingRow
                title="Profil public"
                desc="Permettre aux autres de voir votre profil"
                value={settings.publicProfile}
                onToggle={() => setSettings((s) => ({ ...s, publicProfile: !s.publicProfile }))}
                labels={{ on: "Public", off: "Privé" }}
              />
              <SettingRow
                title="Partage des recettes"
                desc="Partager vos créations avec la communauté"
                value={settings.shareRecipes}
                onToggle={() => setSettings((s) => ({ ...s, shareRecipes: !s.shareRecipes }))}
              />

              <button className="btnDanger" type="button">
                Supprimer mon compte
              </button>
              <button className="btnGhostWide" type="button">
                Exporter mes données
              </button>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- small components ---------------- */

function Field({ label, icon, value, disabled, onChange }) {
  return (
    <div className="field">
      <div className="fieldLabel">{label}</div>
      <div className={`inputWrap ${disabled ? "disabled" : ""}`}>
        <span className="inputIcon" aria-hidden="true">{icon}</span>
        <input
          className="input"
          value={value}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.value)}
        />
      </div>
    </div>
  );
}

function Group({ title, chips, onRemove, onAdd, chipTone }) {
  return (
    <div className="group">
      <div className="groupTitle">{title}</div>
      <div className="chipRow">
        {chips.map((c) => (
          <button
            key={c}
            type="button"
            className={`chip ${chipTone}`}
            title="Cliquer pour enlever"
            onClick={() => onRemove?.(c)}
          >
            {c} <span className="x">×</span>
          </button>
        ))}
        <button type="button" className="chip add" onClick={onAdd}>
          + Ajouter
        </button>
      </div>
    </div>
  );
}

function SettingRow({ title, desc, value, onToggle, labels }) {
  const onLabel = labels?.on ?? "Activé";
  const offLabel = labels?.off ?? "Désactivé";

  return (
    <div className="settingRow">
      <div>
        <div className="settingTitle">{title}</div>
        <div className="muted">{desc}</div>
      </div>

      <button
        type="button"
        className={`toggleBtn ${value ? "on" : "off"}`}
        onClick={onToggle}
      >
        {value ? onLabel : offLabel}
      </button>
    </div>
  );
}
