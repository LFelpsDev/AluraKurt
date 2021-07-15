import React, { useState, useEffect } from "react";
import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import {
  AlurakutMenu,
  AlurakutProfileSidebarMenuDefault,
  OrkutNostalgicIconSet,
} from "../src/lib/AlurakutCommons";
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations";

function ProfileSideBar(props) {
  return (
    <Box as="aside">
      <img
        src={`https://github.com/${props.userGitHub}.png`}
        style={{ borderRadius: "12px" }}
      />
      <hr />

      <p>
        <a className="boxLink" href={`https://github.com/${props.userGitHub}`}>
          @{props.userGitHub}
        </a>
      </p>

      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}




function ProfileRelationsBox(props) {
  console.log('Cidão do posto',props.items)
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {props.title} ({props.items.length})
      </h2>
      <ul>
      {/* {seguidores.map((props) => {
        return (
          <li key={props}>
            <a href={`https://github.com/${props}.png`}>
              <img src={props} />
              <span>{props}</span>
            </a>
          </li>
        );
      })} */}
    </ul>
    </ProfileRelationsBoxWrapper>
  );
}

export default function Home() {
  const [comunidades, setComunidades] = useState([]);

  const githubUser = "LFelpsDev";
  const favoriteUsersGitHub = [
    "pfillipi",
    "marlonelima",
    "williammago",
    "MailoDev",
    "Rafaelalmendra",
    "juliateles22",
    "LFelpsDev"
  ];
  const [seguidores, setSeguidores] = useState([]);
  // 0 Pegar o array de dados do GitHub

  useEffect(() => {
    // GET

    fetch("https://api.github.com/users/LFelpsDev/followers")
      .then(function (respostaDoServidor) {
        return respostaDoServidor.json();
      })
      .then(function (respostaCompleta) {
        setSeguidores(respostaCompleta);
        // console.log(respostaCompleta)
      });

    // API GraphQL
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '4c5db656ecee7fb63fd581c6643483',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ "query": `query {
        allCommunities {
          id
          title
          imageUrl
          creatorSlug
        }
      }` })
    })
      .then((response) => response.json()) // Pega o retorno do response.json() e já retorna
      .then((respostaCompleta) => {

        const comunidadesVindasDoDato = respostaCompleta.data.allCommunities;
          
          console.log(comunidadesVindasDoDato);

          setComunidades(comunidadesVindasDoDato);
      });
  }, []);

  // 1 - Criar um Box Para que vai ter um map, baseado nos items do array que pegamos do GitHub

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: "profileArea" }}>
          <ProfileSideBar userGitHub={githubUser} />
        </div>

        <div className="welcomeArea" style={{ gridArea: "welcomeArea" }}>
          <Box>
            <h1 className="title">Bem Vindo(a)</h1>
            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que Voce Deseja Fazer ?</h2>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                const dadosDoForm = new FormData(event.target);

           
                const comunidade = {
                  title: dadosDoForm.get("title"),
                  imageUrl: dadosDoForm.get("image"),
                  creatorSlug: githubUser,
                };


                fetch('./api/comunidades', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(comunidade)
                })
                .then(async (response) => {
                  const dados = await response.json()
                  const comunidade = dados.registroCriado
                  const comunidadesAtualizadas = [...comunidades, comunidade];
                  setComunidades(comunidadesAtualizadas);
                })
               
                
               
              }}
            >
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>
              <div>
                <input
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                />
              </div>

              <button>Criar comunidade</button>
            </form>
          </Box>
        </div>

        <div
          className="profileRelationsArea"
          style={{ gridArea: "profileRelationsArea" }}
        >
          <ProfileRelationsBox items={seguidores} title="Seguidores" />

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Comunidades ({comunidades.length})</h2>
            <ul>
              {comunidades.map((props) => {
                return (
                  <li key={props.id}>
                    <a href={`/users/${props.title}`}>
                      <img src={props.imageUrl} />
                      <span>{props.title}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({favoriteUsersGitHub.length})
            </h2>

            <ul>
              {favoriteUsersGitHub.map((favoriteUsersGitHub) => {
                return (
                  <li key={favoriteUsersGitHub}>
                    <a href={`https://github.com/${favoriteUsersGitHub}`}>
                      <img
                        src={`https://github.com/${favoriteUsersGitHub}.png`}
                      />
                      <span>{favoriteUsersGitHub}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
}
