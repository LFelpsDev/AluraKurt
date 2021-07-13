import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import { AlurakutMenu, OrkutNostalgicIconSet } from "../src/lib/AlurakutCommons";
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations";

function ProfileSideBar(props) {
  return (
    <Box>
      <img
        src={`https://github.com/${props.userGitHub}.png`}
        style={{ borderRadius: "12px" }}
      />
    </Box>
  );
}

export default function Home() {
  const githubUser = "LFelpsDev";
  const favoriteUsersGitHub = [
    "pfillipi",
    "marlonelima",
    "williammago",
    "MailoDev",
    "Rafaelalmendra",
    "juliateles22",

  ];

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: "profileArea" }}>
          <ProfileSideBar userGitHub={githubUser} />
        </div>

        <div className="welcomeArea" style={{ gridArea: "welcomeArea" }}>
          <Box>
            <h1 ClassName="title">Bem Vindo(a)</h1>  

            <OrkutNostalgicIconSet />
          </Box>
        </div>

        <div
          className="profileRelationsArea"
          style={{ gridArea: "profileRelationsArea" }}
        >
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da Comunidade {favoriteUsersGitHub.length}
            </h2>

            <ul>
              {favoriteUsersGitHub.map((favoriteUsersGitHub) => {
                return (
                  <li>
                    <a
                      href={`users/${favoriteUsersGitHub}`}
                      key={favoriteUsersGitHub}
                    >
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
