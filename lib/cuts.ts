type Localized = [portuguese: string, english: string];
type Cut = { name: string; description: Localized };
type CutGroup = Cut & { cuts?: Cut[] };

export const cutGroups: CutGroup[] = [
  {
    name: "Wagyu",
    description: [
      "O marmoreio fino faz do wagyu um dos cortes mais suculentos do yakiniku. Basta uma selagem rápida para derreter a gordura e realçar o sabor.",
      "Fine marbling makes wagyu one of the juiciest cuts in yakiniku. A quick sear melts the fat and brings out its flavour.",
    ],
  },
  {
    name: "Gyutan",
    description: [
      "A língua de vaca é um clássico japonês, com textura firme e tenra. Experimenta com sal ou com molho de soja e limão.",
      "Beef tongue is a Japanese classic with a firm, tender bite. Try it with salt or a splash of soy sauce and lemon.",
    ],
  },
  {
    name: "Kata & Chuck",
    description: ["Cortes da zona do acém e da paleta, com texturas variadas e sabor intenso.", "Cuts from the chuck and shoulder with a range of textures and deep flavour."],
    cuts: [
      { name: "Kata Rosu (Acém)", description: ["Próximo do pescoço, com marmoreio fino, pouca gordura e sabor intenso.", "From near the neck, with fine marbling, little fat and a pronounced beef flavour."] },
      { name: "Zabuton / Hanashita (Chuck Flap)", description: ["Chamado assim pela forma de almofada. Tem marmoreio uniforme e é muito suculento.", "Named for its cushion-like shape. Even marbling keeps it particularly juicy."] },
      { name: "Kata (Paleta)", description: ["Um corte firme e estruturado, com sabor profundo.", "A firm, well-structured shoulder cut with deep flavour."] },
      { name: "Misuji / Hon Misuji (Top Blade)", description: ["Corte raro da zona da omoplata, rico em umami.", "A rare cut from the shoulder blade, rich in umami."] },
      { name: "Uwa Misuji (Upper Top Blade)", description: ["Uma versão mais magra e delicada, que pede uma selagem rápida.", "A leaner, more delicate cut that takes well to a quick sear."] },
      { name: "Kurimi / Ude Sankaku / Shakushi / Kuri (Chuck Eye)", description: ["Magro e firme, com umami intenso. Combina com temperos simples.", "Lean and firm with intense umami. It pairs well with simple seasonings."] },
      { name: "Togarashi / Tonbi (Chuck Tender)", description: ["Tem a forma de uma malagueta e um sabor intenso. Experimenta com um toque de sal.", "Chilli-shaped and full-flavoured. Try it with a little salt."] },
      { name: "Sankaku Bara (Chuck Short Rib)", description: ["A costela triangular equilibra carne magra e gordura doce. Vai bem com molho sweet chilli.", "Triangular short rib balances lean meat and sweet fat. It goes well with sweet chilli sauce."] },
      { name: "Burisuke / Koune (Brisket)", description: ["Peito de vaca com camadas de gordura e carne magra e um sabor marcado.", "Brisket with layers of fat and lean meat and a pronounced beef flavour."] },
    ],
  },
  {
    name: "Ribs",
    description: ["Cortes da zona das costelas, entre o acém e o lombo.", "Rib cuts sit between the chuck and the loin."],
    cuts: [
      { name: "Entrecôte (Ribeye)", description: ["Tenro e equilibrado, com marmoreio que derrete na grelha.", "Tender and balanced, with marbling that melts on the grill."] },
      { name: "Rib Kaburi (Rib Cap)", description: ["A capa da costela é muito marmorizada, com gordura doce e sabor intenso.", "The rib cap is heavily marbled, with sweet fat and intense flavour."] },
      { name: "Rib Rosu Shin / Rib Shin (Ribeye)", description: ["O centro da costela, valorizado pela textura tenra.", "The centre of the ribeye, prized for its tenderness."] },
      { name: "Maki Rosu / Maki (Ribeye Lip)", description: ["Corte delicado que envolve o ribeye, com marmoreio generoso.", "A delicate, generously marbled cut that surrounds the ribeye."] },
    ],
  },
  {
    name: "Tomo Bara & Short Ribs",
    description: ["Costelas e cortes próximos, conhecidos pelo sabor profundo e pela textura suculenta.", "Short ribs and neighbouring cuts, known for their deep flavour and juicy texture."],
    cuts: [
      { name: "Nami Karubi / Tatebara (Boneless Short Ribs)", description: ["Um clássico do yakiniku. A gordura carameliza e ganha um sabor ligeiramente doce.", "A yakiniku classic. The fat caramelises and develops a slightly sweet flavour."] },
      { name: "Nakaochi Karubi (Rib Finger)", description: ["Retirado entre as costelas, tem umami intenso e combina com molho sweet chilli.", "Taken from between the ribs, it has a deep umami flavour and pairs well with sweet chilli sauce."] },
      { name: "Kainomi (Flap Meat)", description: ["Um corte raro entre o lombo e a costela, tenro e suculento.", "A rare, tender and juicy cut from between the loin and the ribs."] },
      { name: "Sasabara / Sasami (Flank)", description: ["Mais suave que a costela, com sabor realçado por uma selagem forte.", "Milder than short rib, with a flavour brought out by a hot sear."] },
      { name: "Uchi Harami (Inside Skirt)", description: ["Um corte abdominal muito apreciado pelo umami. Experimenta com molho de soja.", "A cut from the abdominal muscles, prized for its umami. Try it with soy sauce."] },
    ],
  },
  {
    name: "Loin",
    description: ["Cortes tenros que vão bem com uma selagem breve na grelha.", "Tender cuts suited to a brief sear on the grill."],
    cuts: [
      { name: "Hireshita (Sirloin)", description: ["Um corte nobre e tenro, com marmoreio especialmente visível no wagyu.", "A prized, tender cut, especially well marbled in wagyu beef."] },
    ],
  },
  {
    name: "Ran Ichi",
    description: ["Sabor equilibrado e marmoreio elegante na zona da alcatra.", "Balanced flavour and delicate marbling from the rump."],
    cuts: [
      { name: "Rump (Top Sirloin Butt)", description: ["Textura fina, pouca gordura e sabor suave.", "Fine-textured and lightly marbled, with a clean flavour."] },
      { name: "Ichibo (Top Sirloin Cap)", description: ["Mais firme, com marmoreio fino e umami profundo. Vai bem com sal e pimenta.", "Firmer, with fine marbling and deep umami. It pairs well with salt and pepper."] },
    ],
  },
  {
    name: "Sotomomo",
    description: ["Cortes da parte exterior da perna, com perfis que vão do magro ao gelatinoso.", "Cuts from the outer hind leg range from lean and firm to rich in gelatin."],
    cuts: [
      { name: "Makura / Shikinbo (Eye of Round)", description: ["Magro, fibroso e de textura firme.", "Lean and fibrous with a firm bite."] },
      { name: "Habaki (Heel)", description: ["Um corte relativamente tenro para esta zona, com sabor intenso.", "Relatively tender for this area, with an intense flavour."] },
      { name: "Nakaniku (Outside Round)", description: ["Magro e firme, para quem gosta de um sabor de carne mais intenso.", "Lean and firm, for those who enjoy a more pronounced beef flavour."] },
      { name: "Senbon / Senbon Suji (Super Digital Flexor Muscle)", description: ["Um corte raro, rico em gelatina e surpreendentemente tenro quando bem cozinhado.", "A rare, gelatin-rich cut that becomes surprisingly tender when cooked well."] },
    ],
  },
  {
    name: "Uchimomo / Uchihira",
    description: ["O coxão mole vem do interior da perna traseira e pode ser dividido em omomo, komomo e uchimomo kaburi.", "The inside round comes from the inner hind leg and can be divided into omomo, komomo and uchimomo kaburi."],
    cuts: [
      { name: "Uchimomo / Uchihira (Inside Round)", description: ["Magro, suave e tenro. Experimenta com alho e molho de soja.", "Lean, mild and tender. Try it with garlic and soy sauce."] },
      { name: "Marushin / Shinshin (Knuckle Main Muscle)", description: ["Um corte magro e delicado, com sabor equilibrado.", "A lean, delicate cut with balanced flavour."] },
      { name: "Marukawa (Knuckle Inside Muscle)", description: ["Tenro e de sabor suave, adequado para uma selagem rápida.", "Tender and mild, well suited to a quick sear."] },
    ],
  },
];
