// script.js - Monitoria CEMCS

document.addEventListener('DOMContentLoaded', () => {
    let usuarioLogado = null;

    // Elementos
    const pages = document.querySelectorAll('.page');
    const navLinks = document.querySelectorAll('nav a[data-page]');
    const btnLogout = document.getElementById('btn-logout');
    const navDashboard = document.getElementById('nav-dashboard');

    // Mostrar página
    function showPage(pageId) {
        pages.forEach(page => {
            page.style.display = page.id === `section-${pageId}` ? 'block' : 'none';
        });
    }

    // Navegação
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.getAttribute('data-page');
            if (page === 'dashboard' && !usuarioLogado) {
                alert('Faça login para acessar o Dashboard');
                return;
            }
            showPage(page);
        });
    });

    // ====================== LOGIN ======================
    const loginForm = document.getElementById('login-form');
    const loginMessage = document.getElementById('login-message');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();
        const senha = document.getElementById('senha').value.trim();

        if (!email || !senha) {
            showMessage(loginMessage, 'Preencha todos os campos!', 'error');
            return;
        }

        if (senha.length < 6) {
            showMessage(loginMessage, 'A senha deve ter no mínimo 6 caracteres.', 'error');
            return;
        }

        // Simulação de login bem-sucedido
        usuarioLogado = { email, nome: email.split('@')[0] };
        
        showMessage(loginMessage, 'Login realizado com sucesso!', 'success');
        
        setTimeout(() => {
            document.getElementById('section-login').style.display = 'none';
            navDashboard.style.display = 'inline';
            btnLogout.style.display = 'inline';
            showPage('dashboard');
        }, 800);
    });

    function showMessage(element, text, type) {
        element.textContent = text;
        element.className = `message ${type}`;
        setTimeout(() => element.textContent = '', 3000);
    }

    // ====================== LOGOUT ======================
    btnLogout.addEventListener('click', () => {
        if (confirm('Deseja realmente sair?')) {
            usuarioLogado = null;
            navDashboard.style.display = 'none';
            btnLogout.style.display = 'none';
            document.getElementById('section-login').style.display = 'block';
            showPage('inicio');
        }
    });

    // ====================== AGENDAMENTOS ======================
    let agendamentos = [];

    const agendamentoForm = document.getElementById('agendamento-form');
    const listaAgendamentos = document.getElementById('lista-agendamentos');

    agendamentoForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const disciplina = document.getElementById('disciplina').value;
        const data = document.getElementById('data').value;
        const horario = document.getElementById('horario').value;

        if (!disciplina || !data || !horario) {
            alert('Preencha todos os campos do agendamento.');
            return;
        }

        const novoAgendamento = {
            id: Date.now(),
            disciplina,
            data,
            horario
        };

        agendamentos.push(novoAgendamento);
        renderAgendamentos();
        agendamentoForm.reset();
        alert('Agendamento realizado com sucesso!');
    });

    function renderAgendamentos() {
        listaAgendamentos.innerHTML = '';
        
        if (agendamentos.length === 0) {
            listaAgendamentos.innerHTML = '<li>Nenhum agendamento encontrado.</li>';
            return;
        }

        agendamentos.forEach(ag => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${ag.disciplina}</strong><br>
                📅 ${ag.data} às ${ag.horario}
                <button class="btn-cancelar" data-id="${ag.id}">Cancelar</button>
            `;
            listaAgendamentos.appendChild(li);
        });

        // Botões de cancelar
        document.querySelectorAll('.btn-cancelar').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.getAttribute('data-id'));
                agendamentos = agendamentos.filter(a => a.id !== id);
                renderAgendamentos();
            });
        });
    }

    // Botões de inscrição nas vagas
    document.querySelectorAll('.btn-inscrever').forEach(btn => {
        btn.addEventListener('click', () => {
            if (!usuarioLogado) {
                alert('Faça login para se inscrever em vagas.');
                showPage('login');
                return;
            }
            alert('Inscrição realizada com sucesso! ✅\nVocê receberá mais informações por e-mail.');
        });
    });

    // Inicialização
    showPage('inicio');
});