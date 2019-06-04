class Horario {
	static agora() {
		let date = new Date();
		return {
			seg : date.getSeconds(),
			min : date.getMinutes(),
			hor : date.getHours(),
			dia : date.getDate(),
			mes : date.getMonth() + 1,
			ano : date.getFullYear()
		};
	}
	
	static formatado(pHorario) {		
		return ('00' + pHorario.dia).slice(-2) + '/' + ('00' + pHorario.mes).slice(-2) + '/' + pHorario.ano +
			' ' + ('00' + pHorario.hor).slice(-2) + ':' + ('00' + pHorario.min).slice(-2) + ':' + ('00' + pHorario.seg).slice(-2);
	}
}

class Chamado {
	constructor(pId) {
		this.id = pId;
		this.titulo = '';
		this.intervalos = [];
	}
	
	inicie() {
		this.intervalos.unshift({
			ini: Horario.agora(),
			fim: false
		});
		Display.inicie(this);
	}
	
	pare() {
		this.intervalos[0].fim = Horario.agora();
	}
}

class Workrometer {
	constructor(salvo) {
		salvo = JSON.parse(salvo);
		
		this.id = salvo.id || 0;
		this.chamados = salvo.chamados || [];
		this.rodando = false;
		Display.lista(this.chamados);
		this.salve();
	}
	
	adicione() {
		this.chamados.push(new Chamado(++this.id));
		this.inicie(this.id);
		this.salve();
	}
	
	inicie(pNumChamado) {
		if (this.rodando) {
			this.rodando.pare();
		}
		this.rodando = this.chamados.find(pChamado => pChamado.id === pNumChamado);
		this.rodando.inicie();
		Display.lista(this.chamados);
		this.salve();
	}
	
	mude(pNumChamado, pTitulo) {
		console.log(pNumChamado, pTitulo);
		this.chamados.find(pChamado => pChamado.id === pNumChamado).titulo = pTitulo.value;
		Display.lista(this.chamados);
		this.salve();
	}
	
	salve() {
		localStorage.setItem('workrometer', JSON.stringify({
			id: this.id,
			chamados: this.chamados
		}));		
	}
}

class Display {
	static inicie(pChamado) {
		let intervalos = '';
		const html = function (intervalo) {
			intervalos += '<li>' + Horario.formatado(intervalo.ini) + ' - ' + (intervalo.fim ? Horario.formatado(intervalo.fim) : '') + '</li>';
		};
		
		pChamado.intervalos.forEach(html);		
		
		document.getElementById('rodando').innerHTML =
			'<div class="chamado">' +
				'<input type="text" class="titulo" value="' + pChamado.titulo + '" onchange="controle.mude(' + pChamado.id + ', this)"/>' +
				'<ul class="intervalos">' + intervalos + '</ul>' +
			'</div>';
	}
	
	static lista(pChamados) {
		let show = document.getElementById('chamados');
		show.innerHTML = '';
		
		const atualiza = function (chamado) {
			let intervalos = '';
			const html = function (intervalo) {
				intervalos += '<li>' + Horario.formatado(intervalo.ini) + ' - ' + (intervalo.fim ? Horario.formatado(intervalo.fim) : '') + '</li>';
			};		
			chamado.intervalos.forEach(html);
			show.innerHTML +=
				'<div class="chamado">' +
					'<input type="text" class="titulo" value="' + chamado.titulo + '" readonly/>' +
					'<ul class="intervalos">' + intervalos + '</ul>' +
				'</div>'
		}
		
		pChamados.forEach(atualiza);
	}
}

let controle = new Workrometer(localStorage.getItem('workrometer'));