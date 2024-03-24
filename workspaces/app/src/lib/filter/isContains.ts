type Params = {
  query: string;
  target: string;
};

export function isContains({ query, target }: Params): boolean {
  return normalizeString(target).includes(normalizeString(query));
}

// 正規化関数を定義
function normalizeString(str: string) {
  // ひらがな、カタカナを全角カタカナに変換
  let normalizedStr = str.replace(/[\u3041-\u3096]/g, function(match: string) {
      return String.fromCharCode(match.charCodeAt(0) + 0x60);
  });
  // 半角カナを全角カナに変換
  normalizedStr = normalizedStr.replace(/[\uFF66-\uFF9D]/g, function(match: string) {
      return String.fromCharCode(match.charCodeAt(0) + 0xFEE0);
  });
  // 半角英数字を全角に変換
  normalizedStr = normalizedStr.replace(/[!-~]/g, function(match: string) {
      return String.fromCharCode(match.charCodeAt(0) + 0xFEE0);
  });
  // 絵文字を正規化
  normalizedStr = normalizedStr.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, '');
  return normalizedStr;
}
