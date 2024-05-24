import plugin from 'tailwindcss/plugin';

const fontVariationSettings = plugin(function ({
  addUtilities,
}: {
  addUtilities;
}) {
  // predefined font stretch amounts
  const stretch: { [key: string]: number } = {
    ultracondensed: 50,
    extracondensed: 62.5,
    condensed: 75,
    semicondensed: 87.5,
    base: 100,
    semiexpanded: 112.5,
    expanded: 125,
    extraexpanded: 150,
    ultraexpanded: 200,
  };
  // predefined font weights
  const weights: { [key: string]: number } = {
    thin: 100,
    extraLight: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  };

  // weights, weights + italic, weights + stretch, weights + stretch + italic
  Object.entries(weights).forEach(([key, value]) => {
    const select = `.font-${key}`;
    const baseData: {
      [key: string]: { fontWeight: number; fontVariationSettings: string };
    } = {};
    baseData[select] = {
      fontWeight: value,
      fontVariationSettings: `'wght' ${value}`,
    };
    Object.entries(stretch).forEach(([sKey, sValue]) => {
      const sSelect = `&.font-${sKey}`;
      const sSelectItalic = `&.italic.font-${sKey}`;

      baseData[select][sSelectItalic] = {
        fontVariationSettings: `'slnt' 1, 'wdth' ${sValue}, 'wght' ${value}`,
      };
      baseData[select][sSelect] = {
        fontVariationSettings: `'wdth' ${sValue}, 'wght' ${value}`,
      };
    });
    baseData[select]['&.italic'] = {
      fontVariationSettings: `'slnt' 1, 'wght' ${value}`,
    };
    addUtilities(baseData);
  });

  // stretch, stretch + italics
  Object.entries(stretch).forEach(([key, value]) => {
    const select = `.font-${key}`;
    const stretchData: {
      [key: string]: { fontStretch: string; fontVariationSettings: string };
    } = {};
    stretchData[select] = {
      fontStretch: value.toString() + '%',
      fontVariationSettings: `'wdth' ${value}`,
    };
    addUtilities(stretchData);
  });

  // italics
  addUtilities({
    '.italic': {
      fontStyle: 'italic',
      fontVariationSettings: "'slnt' 1",
    },
  });
});

export default fontVariationSettings;
