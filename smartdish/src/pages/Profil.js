import React, { useMemo, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Profil.css";

export default function Profil() {
  const tabs = useMemo(
    () => [
      { key: "profil", label: "Profil" },
      { key: "preferences", label: "Préférences" },
      { key: "parametres", label: "Paramètres" },
    ],
    []
  );

  const [active, setActive] = useState("profil");

  // --- USER (mock) ---
  const [user, setUser] = useState({
    fullName: "Marie Dubois",
    email: "marie.dubois@email.com",
    phone: "+33 6 12 34 56 78",
    location: "Paris, France",
    bio:
      "Passionnée de cuisine depuis toujours, j'adore découvrir de nouvelles recettes et partager mes créations culinaires.",
    memberSince: "Janvier 2024",
  });

  // --- EDIT MODE ---
  const [editProfile, setEditProfile] = useState(false);
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
  };

  // --- STATS (mock) ---
  const stats = useMemo(
    () => ({
      cooked: 47,
      favorites: 23,
      avgRating: 4.6,
      totalTime: "18h 30min",
    }),
    []
  );

  // --- PREFERENCES (mock) ---
  const [prefs, setPrefs] = useState({
    diet: ["Végétarien"],
    allergies: ["Arachide"],
    cuisines: ["Italien", "Français", "Asiatique"],
    level: "Intermédiaire",
    cookTime: "30-45 min",
  });

  const removeChip = (groupKey, value) => {
    setPrefs((p) => ({ ...p, [groupKey]: p[groupKey].filter((x) => x !== value) }));
  };

  const addChip = (groupKey) => {
    const label = window.prompt("Ajouter :");
    if (!label) return;
    setPrefs((p) => ({ ...p, [groupKey]: [...new Set([...p[groupKey], label])] }));
  };

  // --- SETTINGS (mock) ---
  const [settings, setSettings] = useState({
    newRecipes: true,
    reminders: true,
    newsletter: false,
    publicProfile: false,
    shareRecipes: true,
  });

  return (
    <>
      <Header />

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
          {/* ---------------- PROFIL ---------------- */}
          {active === "profil" && (
            <div className="grid2">
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
                  <div className="avatar">👤</div>
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
                      rows={3}
                      value={editProfile ? draft.bio : user.bio}
                      disabled={!editProfile}
                      onChange={(e) => setDraft((d) => ({ ...d, bio: e.target.value }))}
                    />
                  </div>
                </div>
              </section>

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

          {/* ---------------- PREFERENCES ---------------- */}
          {active === "preferences" && (
            <div className="grid2">
              <section className="card">
                <Group
                  title="Régime alimentaire"
                  chips={prefs.diet}
                  chipTone="green"
                  onRemove={(v) => removeChip("diet", v)}
                  onAdd={() => addChip("diet")}
                />

                <Group
                  title="Allergies"
                  chips={prefs.allergies}
                  chipTone="red"
                  onRemove={(v) => removeChip("allergies", v)}
                  onAdd={() => addChip("allergies")}
                />

                <Group
                  title="Types de cuisine préférés"
                  chips={prefs.cuisines}
                  chipTone="beige"
                  onRemove={(v) => removeChip("cuisines", v)}
                  onAdd={() => addChip("cuisines")}
                />
              </section>

              <section className="card">
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

          {/* ---------------- PARAMETRES ---------------- */}
          {active === "parametres" && (
            <div className="grid2">
              <section className="card">
                <SettingRow
                  title="Nouvelles recettes"
                  value={settings.newRecipes}
                  onToggle={() => setSettings((s) => ({ ...s, newRecipes: !s.newRecipes }))}
                />

                <SettingRow
                  title="Rappels de cuisine"
                  value={settings.reminders}
                  onToggle={() => setSettings((s) => ({ ...s, reminders: !s.reminders }))}
                />

                <SettingRow
                  title="Newsletter"
                  value={settings.newsletter}
                  onToggle={() => setSettings((s) => ({ ...s, newsletter: !s.newsletter }))}
                />
              </section>

              <section className="card">
                <SettingRow
                  title="Profil public"
                  value={settings.publicProfile}
                  onToggle={() => setSettings((s) => ({ ...s, publicProfile: !s.publicProfile }))}
                />

                <SettingRow
                  title="Partage des recettes"
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

      <Footer />
    </>
  );
}

/* ---------- Components internes ---------- */

function Field({ label, icon, value, disabled, onChange }) {
  return (
    <div className="field">
      <div className="fieldLabel">{label}</div>
      <div className={`inputWrap ${disabled ? "disabled" : ""}`}>
        <span className="inputIcon">{icon}</span>
        <input
          className="input"
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
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
          <button key={c} className={`chip ${chipTone}`} onClick={() => onRemove(c)}>
            {c} ×
          </button>
        ))}
        <button className="chip add" onClick={onAdd}>
          + Ajouter
        </button>
      </div>
    </div>
  );
}

function SettingRow({ title, value, onToggle }) {
  return (
    <div className="settingRow">
      <div className="settingTitle">{title}</div>
      <button className={`toggleBtn ${value ? "on" : "off"}`} onClick={onToggle}>
        {value ? "Activé" : "Désactivé"}
      </button>
    </div>
  );
}
