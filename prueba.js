async function mostrarCartas(){
    const response = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?cards= XX,AS,AD,AC,AH,JS,JD,JC,JH,QS,QD,QC,QH,KS,KD,KC,KH");
    //XX es para solucionar un problema de la api, ya que omite el primer parametro y AS nunca formaba parte de la baraja de cartas
    const dato = await response.json();
    console.log(dato);
    const deckId = dato.deck_id;
    console.log(`ID del mazo: ${deckId}`);
    console.log(`Cartas restantes en el mazo: ${dato.remaining}`);
    const respuestaCartas = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=5`);
    const datosCartas = await respuestaCartas.json();
    console.log("Cartas Jugador 1");
    console.log(datosCartas);
    console.log(`Cartas restantes en el mazo: ${datosCartas.remaining}`);

    /*SEGUNDA PETICION/ */
    const respuestaCartas2 = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=5`);
    const datosCartas2 = await respuestaCartas2.json();
    console.log("Cartas Jugador 2");
    console.log(datosCartas2);
    console.log(`Cartas restantes en el mazo: ${datosCartas2.remaining}`);

    const contenedor = document.getElementById('cartas');
    datosCartas.cards.forEach(carta => {
      const img = document.createElement('img');
      img.src = carta.image;
      img.alt = `${carta.value} de ${carta.suit}`;
      img.style.width = '100px';
      contenedor.appendChild(img);
    });

    const contenedor2 = document.getElementById('cartas2');
    datosCartas2.cards.forEach(carta => {
      const img = document.createElement('img');
      img.src = carta.image;
      img.alt = `${carta.value} de ${carta.suit}`;
      img.style.width = '100px';
      contenedor2.appendChild(img);
    });

    /* DEVOLVER TODAS LAS CARTAS AL MAZO */
    const respuestaCartas3 = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/ `);
    const datosCartas3 = await respuestaCartas3.json();
    console.log(`Cartas restantes en el mazo: ${datosCartas3.remaining}`);
}

mostrarCartas();