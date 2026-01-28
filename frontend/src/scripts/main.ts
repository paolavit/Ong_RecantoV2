
// function atualizarInterfaceUsuario() {
//     //const user = getUserFromToken();

//     const loginMenu = document.getElementById("menu-login");
//     const logoutMenu = document.getElementById("menu-logout");
//     const cadastroAnimal = document.getElementById("menu-cadastro-animal");
//     const cadastroAdmnistrador = document.getElementById("menu-cadastro-administrador");
//     const cadastrarUsuarioComum = document.getElementById("menu-cadastro-usuario")
//     const cadastrarUsuarioVoluntario = document.getElementById("menu-cadastro-voluntario")
//     const animaisAdotados = document.getElementById("menu-animais-adotados")
//     const menuPedidosAdocao = document.getElementById("menu-pedidos-adocao");

//     if(user) {
//         if (loginMenu) loginMenu.style.display = "none";
//         if (cadastrarUsuarioComum) cadastrarUsuarioComum.style.display = "none";

//         if (logoutMenu) logoutMenu.style.display = "inline";
//         if (animaisAdotados) animaisAdotados.style.display = "inline";

//         const isAdmin = user.tipo_usuario === "admin";
//         const isVoluntario = user.tipo_usuario === "voluntario";

//         if (cadastroAnimal) cadastroAnimal.style.display = (isAdmin || isVoluntario) ? "inline" : "none";
//         if (cadastroAdmnistrador) cadastroAdmnistrador.style.display = isAdmin ? "inline" : "none"
//         if (cadastrarUsuarioVoluntario) cadastrarUsuarioVoluntario.style.display = isAdmin ? "inline" : "none";
//         if (menuPedidosAdocao) menuPedidosAdocao.style.display = isAdmin ? "inline" : "none";

//     }
//     else {
//         if (loginMenu) loginMenu.style.display = "inline";
//         if (cadastrarUsuarioComum) cadastrarUsuarioComum.style.display = "inline";

//         if (logoutMenu) logoutMenu.style.display = "none";
//         if (cadastroAnimal) cadastroAnimal.style.display = "none";
//         if (cadastroAdmnistrador) cadastroAdmnistrador.style.display = "none";
//         if (cadastrarUsuarioVoluntario) cadastrarUsuarioVoluntario.style.display = "none";
//         if (animaisAdotados) animaisAdotados.style.display = "none";
//         if (menuPedidosAdocao) menuPedidosAdocao.style.display = "none";
//     }
// }
