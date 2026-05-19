let quests = [];
let selectedTags = {};

fetch("quest.json")
  .then(res => res.json())
  .then(data => {
    quests = data;
    renderTags();
    renderQuests();
  });

// タグ生成
function renderTags() {
  const tagBox = document.getElementById("tags");
  tagBox.innerHTML = "";

  const categories = {};

  quests.forEach(q => {
    for (const category in q.tags) {
      if (!categories[category]) categories[category] = new Set();

      q.tags[category].forEach(tag => {
        categories[category].add(tag);
      });
    }
  });

  for (const category in categories) {
    const group = document.createElement("div");
    group.className = "tag-group";

    group.innerHTML = `<h3>${category}</h3>`;

    categories[category].forEach(tag => {
      const el = document.createElement("span");
      el.className = "tag";
      el.innerText = tag;

      el.onclick = () => {
        if (!selectedTags[category]) selectedTags[category] = [];

        if (selectedTags[category].includes(tag)) {
          selectedTags[category] =
            selectedTags[category].filter(t => t !== tag);
          el.classList.remove("active");
        } else {
          selectedTags[category].push(tag);
          el.classList.add("active");
        }

        renderQuests();
      };

      group.appendChild(el);
    });

    tagBox.appendChild(group);
  }
}

// クエスト描画
function renderQuests() {
  const list = document.getElementById("questList");
  const search = document.getElementById("search").value.toLowerCase();

  list.innerHTML = "";

  quests
    .filter(q => {
      const matchName =
        q.name.toLowerCase().includes(search);

      const matchTags = Object.keys(selectedTags).every(category => {
        if (!selectedTags[category].length) return true;

        return selectedTags[category].some(tag =>
          q.tags[category]?.includes(tag)
        );
      });

      return matchName && matchTags;
    })
    .forEach(q => {
      const div = document.createElement("div");
      div.className = "quest";

      div.innerHTML = `
        <img src="${q.image}">
        <div class="quest-content">
          <h3>${q.name}</h3>
          <div class="stats">
            Col: ${q.col} |
            EXP: ${q.exp} |
            GuildEXP: ${q.guildExp} |
            ⏱ ${q.timeLimit}
          </div>
        </div>
      `;

      div.onclick = () => {
        window.location.href = q.page;
      };

      list.appendChild(div);
    });
}

// 検索
document.addEventListener("input", e => {
  if (e.target.id === "search") renderQuests();
});
