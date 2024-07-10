import style from "./whoweare.module.scss";

function WhoWeAre() {
  return (
    <div className={`${style.WhoWeAre}`}>
      <h1>Qui sommes-nous ?</h1>
      <p className="introduction">
        Bienvenue sur notre plateforme de recrutement en informatique. Chez
        Externatic, nous sommes passionnés par la recherche des meilleurs
        talents pour répondre aux besoins complexes de l'industrie informatique.
      </p>
      <p>
        Notre cabinet de recrutement se distingue par son engagement envers
        l'excellence, l'innovation et la satisfaction tant des entreprises que
        des candidats. Nous croyons fermement que la clé du succès réside dans
        la mise en relation de professionnels qualifiés avec des opportunités de
        carrière enrichissantes.
      </p>
      <div>
        <h2 className={`${style.missionVision}`}>Notre Mission</h2>
        <p>
          Chez Externatic, notre mission est de simplifier le processus de
          recrutement informatique en mettant en avant les compétences des
          candidats et en fournissant des solutions sur mesure aux entreprises à
          la recherche de talents qualifiés.
        </p>
        <h2 className={`${style.missionVision}`}>Notre Vision</h2>
        <p>
          Nous aspirons à être le partenaire de confiance pour les
          professionnels de l'informatique, en les accompagnant tout au long de
          leur carrière, et pour les entreprises, en leur offrant un accès
          simplifié aux meilleurs talents du secteur.
        </p>
      </div>
      <p className="engagement">
        Chez Externatic, nous sommes engagés à créer un environnement inclusif
        et diversifié, favorisant l'épanouissement professionnel et personnel de
        chacun de nos membres.
      </p>
    </div>
  );
}

export default WhoWeAre;
