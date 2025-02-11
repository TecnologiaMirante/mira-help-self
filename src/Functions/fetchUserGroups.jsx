function extrairSetor(path) {
  if (!path) return "Setor não encontrado";

  const partes = path.split(" > ");
  return partes.length >= 3 ? partes[2] : "Setor não encontrado";
}

export default async function fetchUserGroups(email) {
  const GLPI_API_URL = import.meta.env.VITE_GLPI_API_URL;
  const GLPI_APP_TOKEN = import.meta.env.VITE_GLPI_APP_TOKEN;
  const GLPI_USER_TOKEN = import.meta.env.VITE_GLPI_USER_TOKEN;

  if (!email) {
    console.error("❌ Por favor, insira um e-mail válido.");
    return "Setor não encontrado";
  }

  let sessionToken;
  try {
    // 🔑 Inicia sessão no GLPI
    const sessionData = await fetchJson(`${GLPI_API_URL}/initSession`, {
      "App-Token": GLPI_APP_TOKEN,
      Authorization: `user_token ${GLPI_USER_TOKEN}`,
    });

    sessionToken = sessionData.session_token;

    // 🔍 Busca usuário pelo e-mail
    const searchUrl = `${GLPI_API_URL}/search/User?criteria[0][field]=5&criteria[0][searchtype]=contains&criteria[0][value]=${encodeURIComponent(
      email
    )}`;
    const userData = await fetchJson(searchUrl, {
      "Session-Token": sessionToken,
      "App-Token": GLPI_APP_TOKEN,
    });

    if (userData.totalcount === 0) {
      console.warn("⚠️ Usuário não encontrado.");
      return "Setor não encontrado";
    }

    // 📌 Obtém o caminho do grupo/setor
    let fullGroupPath = userData.data[0]?.[13] ?? "";

    // ✅ Garante que fullGroupPath seja uma string
    if (Array.isArray(fullGroupPath)) {
      fullGroupPath = fullGroupPath[0] || "";
    }

    const setor = extrairSetor(fullGroupPath);

    return setor;
  } catch (error) {
    console.error("❌ Erro ao buscar usuário:", error);
    return "Setor não encontrado";
  } finally {
    // 🔐 Encerra a sessão
    if (sessionToken) {
      await fetchJson(`${GLPI_API_URL}/killSession`, {
        "Session-Token": sessionToken,
        "App-Token": GLPI_APP_TOKEN,
      });
    }
  }
}

// 🔄 Função auxiliar para chamadas API
async function fetchJson(url, headers) {
  const response = await fetch(url, { method: "GET", headers });
  if (!response.ok)
    throw new Error(`Erro na requisição: ${response.statusText}`);
  return response.json();
}
