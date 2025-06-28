import { parseStringPromise } from "xml2js";

export interface OfxTransaction {
  trntype: string;
  dtposted: string;
  trnamt: string;
  fitid: string;
  memo: string;
}

export interface OfxParsedData {
  ofx: {
    bankmsgsrsv1: {
      stmttrnrs: {
        stmtrs: {
          banktranlist: {
            stmttrn: OfxTransaction[] | OfxTransaction;
          };
        };
      };
    };
  };
}

/**
 * Extrai a parte XML válida do conteúdo OFX.
 */
function extractOFXBody(raw: string): string {
  const match = raw.match(/<OFX>(.|\n|\r)*<\/OFX>/i);
  if (!match) {
    throw new Error("Conteúdo OFX inválido ou incompleto.");
  }
  return match[0];
}

/**
 * Converte conteúdo OFX (string) para objeto JSON estruturado.
 * 
 * @param ofxText Conteúdo bruto do arquivo OFX
 * @returns JSON com a estrutura do arquivo OFX
 */
export async function parseOfxToJson(ofxText: string): Promise<OfxParsedData> {
  const xml = extractOFXBody(ofxText);

  const json = await parseStringPromise(xml, {
    explicitArray: false,
    ignoreAttrs: true,
    trim: true,
    tagNameProcessors: [(name) => name.toLowerCase()],
  });

  return json as OfxParsedData;
}
