# 📖 Core — Bíblia Viva Mobile App

An intuitive, modern, and highly optimized React Native (Expo) application designed for structured daily devotional readings. The application operates with an intelligent hybrid data strategy, featuring integrated local storage and robust error-mitigation components to ensure seamless offline functionality.

---

## 🛠️ Tech Stack & Architecture

- **Framework:** React Native (Expo)
- **State & Storage Management:** AsyncStorage (Asynchronous local key-value data store)
- **Language:** JavaScript (ES6+)
- **UI Design:** Pure Core Components (Performance-first stylesheets with dynamic layout rendering)

The architecture leverages a decoupled service module strategy found within `/src/modules/`, ensuring a clean separation of concerns between raw bible data querying, user progress metrics, and UI orchestration.

---

## 📊 Core Features

### 1. Hybrid Storage Engine (Cloud & On-Demand)
- **Factory Baseline:** The King James Version (KJV) comes bundled natively within the app binary (bible-default.json), ensuring absolute day-one availability without requiring an internet connection.
- **On-Demand Modules:** Mappings for additional translations, such as Almeida Revista e Atualizada (ARA) and Nova Versão Internacional (NVI), operate dynamically. The storage layer handles incremental downloads using structured progress updates (20% intervals).

### 2. Failure-Resilient UI Rendering (Fallback Guard)
To guarantee a bulletproof user experience, the text resolution service features an automated structural fallback. If an external translation file is unpopulated, corrupted, or undergoing download synchronization, the query engine transparently redirects the dataset context back to the native KJV repository. This mitigates layout crashes, null exceptions, and loading stubs.

### 3. Synchronized Daily Devotional Engine
A time-synchronized serverless algorithm updates the Verse of the Day on a strict 24-hour interval. It translates the numerical calendar tracking into a relational database offset based on the day of the year and total available books. This mathematical model guarantees that every application instance globally renders the exact same structural verse synchronicity.

### 4. Gamified Engagement Metrics
- **XP Progression System:** Tracks active structural interactions and completed readings.
- **Retention Analytics:** Computes continuous daily usage streaks to increase user daily engagement.

---

## 📁 Repository Structure

- assets/bibles/bible-default.json (Factory Pre-installed Complete KJV)
- assets/bibles/bible-ara.json (Downloadable Placeholder Mappings)
- assets/bibles/bible-nvi.json (Downloadable Placeholder Mappings)
- src/modules/dailyVerse/dailyVerseService.js (Automated Daily Devotional Engine)
- src/modules/reading/offlineService.js (Native Storage Interceptor)
- src/modules/reading/ConfigScreen.js (Database & Storage Management UI)
- src/modules/reading/BookSelector.js (Structural Navigation Layout)
- App.js (Root Component & Main State Orchestrator)
- package.json (Project Dependencies & Manifest)

---

## 📈 Roadmap

- [x] Pre-installed offline core engine setup.
- [x] Asynchronous on-demand download manager with visual state machines.
- [x] Fault-tolerant fallback data resolution.
- [ ] Connect completion of chapter logs directly to the +10 XP progression trigger.
- [ ] Global keyword search indexing over local assets.
- [ ] Reader customizable styling modules (Dynamic Font Resizing & Native Dark Mode).

---
Developed by Darci 🚀
