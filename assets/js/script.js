// Dados das cidades
const cidades = [
    {
        nome: 'Cidade A',
        numeroLojas: 3,
        clientesNovos: 10000,
        receitaMes: 900000,
        receitaTrimestral: 300000 * 3,
    },
    {
        nome: 'Cidade B',
        numeroLojas: 2,
        clientesNovos: 8000,
        receitaMes: 600000,
        receitaTrimestral: 300000 * 2,
    },
    {
        nome: 'Cidade C',
        numeroLojas: 4,
        clientesNovos: 12000,
        receitaMes: 1200000,
        receitaTrimestral: 300000 * 4,
    },
    {
        nome: 'Cidade D',
        numeroLojas: 3,
        clientesNovos: 9000,
        receitaMes: 660000,
        receitaTrimestral: 220000 * 3,
    },
];

// Cores para os gráficos
const coresClientesNovos = ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)', 'rgba(75, 192, 192, 0.6)'];
const coresReceitaMes = ['rgba(255, 159, 64, 0.6)', 'rgba(153, 102, 255, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)'];
const coresReceitaTrimestral = ['rgba(75, 192, 192, 0.6)', 'rgba(255, 206, 86, 0.6)', 'rgba(255, 159, 64, 0.6)', 'rgba(153, 102, 255, 0.6)'];
const coresNumeroLojas = ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)', 'rgba(75, 192, 192, 0.6)'];

// Gráficos
const ctxClientesNovos = document.getElementById('clientesNovos').getContext('2d');
new Chart(ctxClientesNovos, {
    type: 'bar',
    data: {
        labels: cidades.map(c => c.nome),
        datasets: [{
            label: 'Clientes Novos',
            data: cidades.map(c => c.clientesNovos),
            backgroundColor: coresClientesNovos,
        }]
    },
});

const ctxReceitaMes = document.getElementById('receitaMes').getContext('2d');
new Chart(ctxReceitaMes, {
    type: 'bar',
    data: {
        labels: cidades.map(c => c.nome),
        datasets: [{
            label: 'Receita do Mês (R$)',
            data: cidades.map(c => c.receitaMes),
            backgroundColor: coresReceitaMes,
        }]
    },
});

const ctxReceitaTrimestral = document.getElementById('receitaTrimestral').getContext('2d');
new Chart(ctxReceitaTrimestral, {
    type: 'bar',
    data: {
        labels: cidades.map(c => c.nome),
        datasets: [{
            label: 'Receita Trimestral (R$)',
            data: cidades.map(c => c.receitaTrimestral),
            backgroundColor: coresReceitaTrimestral,
        }]
    },
});

const ctxNumeroLojas = document.getElementById('numeroLojas').getContext('2d');
new Chart(ctxNumeroLojas, {
    type: 'bar',
    data: {
        labels: cidades.map(c => c.nome),
        datasets: [{
            label: 'Número de Lojas',
            data: cidades.map(c => c.numeroLojas),
            backgroundColor: coresNumeroLojas,
        }]
    },
});

// Cálculo da representatividade ponderada
const pesos = {
    receitaMes: 0.4,
    receitaTrimestral: 0.3,
    clientesNovos: 0.2,
    numeroLojas: 0.1,
};

const representatividade = cidades.map(c => {
    return (
        (pesos.receitaMes * c.receitaMes) +
        (pesos.receitaTrimestral * c.receitaTrimestral) +
        (pesos.clientesNovos * c.clientesNovos) +
        (pesos.numeroLojas * c.numeroLojas)
    );
});

// Soma total das representatividades
const totalRepresentatividade = representatividade.reduce((acc, val) => acc + val, 0);

// Cálculo das porcentagens individuais em relação ao total
const porcentagensRepresentatividade = representatividade.map(val => Math.ceil(((val / totalRepresentatividade) * 100)));

// Atualizando o gráfico de representatividade para mostrar os valores em porcentagem
const ctxRepresentatividade = document.getElementById('representatividade').getContext('2d');
new Chart(ctxRepresentatividade, {
    type: 'pie',
    data: {
        labels: cidades.map(c => c.nome),
        datasets: [{
            label: 'Representatividade (%)',
            data: porcentagensRepresentatividade,
            backgroundColor: ['rgba(153, 102, 255, 0.6)', 'rgba(255, 159, 64, 0.6)', 'rgba(255, 206, 86, 0.6)', 'rgba(75, 192, 192, 0.6)'],
        }]
    },
});
