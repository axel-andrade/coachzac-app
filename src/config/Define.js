
const define = {

    appId: 'coachzacId',
    fundamentId: "mTSL9axpws",//"l8UsH10k2Y",//'mTSL9axpws',
    userGroups: ["admin", "coach", "player"],
    codeSteps: ["foot-position", "initial-arm", "right-before", "ball-elevation", "ball-height", "left-extended", "foot-movement", "knee-flexion"],
    nameSteps:
        [
            "Posicionamento do Pés",
            "Posição inicial dos braços e das mãos",
            "Braço direito sobe antes do esquerdo ",
            "Elevação da Bola",
            "Altura da Bola",
            "Braço esquerdo estendido ",
            "Posição e movimentação dos pés ",
            "Flexionamento dos joelhos"
        ],
    baseURL: "https://coachzac-v2-api.herokuapp.com/use",
    //"http://10.0.3.2:1982/use"
    //'https://coachzac-v2-api.herokuapp.com/use'


};
module.exports = define;