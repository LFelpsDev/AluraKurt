import { SiteClient } from "datocms-client";

export default async function recebedorDeRequest(request, response) {
  if (request.method === "POST") {
    const TOKEN = "fd79bf49d8a7b836c20668ae607db8";

    const client = new SiteClient(TOKEN);




    // VALIDAR OS DADOS, ANTES DE SAIR CADASTRANDO
    const registroCriado = await client.items.create({
      // esta faltando o id pois ele é gerado automaticamente pelo DatoCms
      itemType: "968549", // ID do Model de "Communities" criado pelo dato
      ...request.body,
      // title: "Comunidade de Teste",
      // imageUrl: "https://github.com/LFelpsDev.png",
      // creatorSlug: "LFelpsDev",
    });

    console.log(registroCriado);

    response.json({
      dados: "Alguma dado Qualquer",
      registroCriado: registroCriado,     
    });
    return;
  }

  response.status(404).json({
    messageError: 'Calma Meu Parceiro Isso da Trabalho Para fazer, Aguarde Alguns Segundinhos !'
  })
}
