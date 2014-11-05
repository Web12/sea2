var coeff = {
    1: {4: 300, 22: 40, 23: 50, 42: 60, 222: 60, 33: 60, 43: 24, 223: 24, jp: 4},
    11: {22: 12, 23: 50, 42: 60, 222: 60, 33: 60, 43: 24, 223: 24, bfleet: 40 },
    16: {22: 5, 23: 14, 42: 60, 222: 60, 33: 60, 43: 24, 223: 24, bfleet: 40, fleet: 300},
    21: {22: 2, 23: 6, 42: 16, 222: 16, 33: 16, 43: 24, 223: 24, bfleet: 40, fleet: 300},
    26: {22: 1, 23: 3, 42: 8, 222: 8, 33: 8, 43: 10, 223: 10, bfleet: 40, fleet: 300},
    31: {23: 1, 42: 4, 222: 4, 33: 4, 43: 5, 223: 5, bfleet: 40, fleet: 300},
    36: {42: 2, 222: 2, 33: 2, 43: 3, 223: 3, bfleet: 40, fleet: 300},
    41: {43: 1, 223: 1, bfleet: 40, fleet: 300},
    46: {bfleet: 40, fleet: 300},
    51: {bfleet: 10, fleet: 100},
    56: {bfleet: 4, fleet: 40},
    61: {bfleet: 2, fleet: 10},
    66: {bfleet: 1, fleet: 4},

    getCombinationName: function(combination) {
        var name;
        switch  (combination) {
            case 22: name = "2+2"; break;
            case 23: name = "2+3"; break;
            case 42: name = "4+2"; break;
            case 222: name = "2+2+2"; break;
            case 33: name = "3+3"; break;
            case 43: name = "4+3"; break;
            case 223: name = "2+2+3"; break;
            case 'bfleet': name = "Бонус Флот"; break;
            case 'fleet': name = "Флот"; break;
            case 'jp': name = "JACKPOT"; break;
        }

        return name;
    }
};