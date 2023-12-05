let soap    = require('soap');
let request = require('request');

module.exports = class Correios {
  constructor(width) {
    this.calcPrecoUrl = 'https://www.cepcerto.com/ws/json-frete/{cepOrigem}/{cepDestino}/{pesoProduto}/1/1/1/4ab9864150c4752e092124185f912a27adb50d16';
    this.cepUrl       = 'http://viacep.com.br/ws/{CEP}/json';
    this.calcArgs     = {
      nCdEmpresa         : '',
      sDsSenha           : '',
      sCdMaoPropria      : 'N',
      nVlValorDeclarado  : 0,
      sCdAvisoRecebimento: 'N'
    };
  }

  calcPreco(args) {
    let arg = Object.assign({}, this.calcArgs, args);

    return new Promise((resolve, reject) => {

      let url = this.calcPrecoUrl.replace("{cepOrigem}", arg.cepOrigem)
                                 .replace("{cepDestino}", arg.cepDestino)
                                 .replace("{pesoProduto}", arg.pesoProduto);

      request(url, (error, resp, body) => {
        if (error) {
          return reject(error);
        }

        try {
          return resolve(JSON.parse(body))

        } catch (e) {
          return reject({
            Erro: 404,
            MsgErro: 'Não foi possível calcular frete'
          });
        }
      });
    })
  }

  calcPrecoPrazo(args) {
    let arg = Object.assign({}, this.calcArgs, args);

    return new Promise((resolve, reject) => {
      soap.createClient(this.calcPrecoUrl, (error, client) => {
        if ( error ) return reject(error);
        client.CalcPrecoPrazo(arg, (error, result) => {
          if (!error
            && result && result.CalcPrecoPrazoResult
            && result.CalcPrecoPrazoResult.Servicos
            && result.CalcPrecoPrazoResult.Servicos.cServico) {

            return resolve(result.CalcPrecoPrazoResult.Servicos.cServico)
          }

          return reject(error);
        });
      });
    });
  }

  consultaCEP(args) {
    let arg = Object.assign({}, args);

    if ('cep' in arg === false) {
      throw new Error('You need to inform a CEP ex: { cep: 00000000 }');
    }

    return new Promise((resolve, reject) => {
      let url = this.cepUrl.replace('{CEP}', arg.cep.replace('-', ''));

      request(url, (error, resp, body) => {
        if (error) {
          return reject(error);
        }

        try {
          return resolve(JSON.parse(body))

        } catch (e) {
          return reject({
            Erro: 404,
            MsgErro: 'Cep não encontrado'
          });
        }
      });
    });
  }
}
