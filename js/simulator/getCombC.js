//static inline int
StdDeck_StdRules_EVAL_TYPE( StdDeck_CardMask cards, int n_cards )
{
    uint32 ranks, four_mask, three_mask, two_mask,
    n_dups, n_ranks, is_st_or_fl = 0, t, sc, sd, sh, ss;

    sc = StdDeck_CardMask_CLUBS(cards);
    sd = StdDeck_CardMask_DIAMONDS(cards);
    sh = StdDeck_CardMask_HEARTS(cards);
    ss = StdDeck_CardMask_SPADES(cards);

    ranks = sc | sd | sh | ss;
    n_ranks = nBitsAndStrTable[ranks] >> 2;
    n_dups = n_cards - n_ranks;

    if (nBitsAndStrTable[ranks] & 0x01) { /* if n_ranks > 5 */
        if (nBitsAndStrTable[ranks] & 0x02)
            is_st_or_fl = StdRules_HandType_STRAIGHT;

        t = nBitsAndStrTable[ss] | nBitsAndStrTable[sc]
            | nBitsAndStrTable[sd] | nBitsAndStrTable[sh];

        if (t & 0x01) {
            if (t & 0x02)
                return StdRules_HandType_STFLUSH;
            else
                is_st_or_fl = StdRules_HandType_FLUSH;
        };

        if (is_st_or_fl && n_dups < 3)
            return is_st_or_fl;
    };

    switch (n_dups) {
        case 0:
            return StdRules_HandType_NOPAIR;
            break;

        case 1:
            return StdRules_HandType_ONEPAIR;
            break;

        case 2:
            two_mask = ranks ^ (sc ^ sd ^ sh ^ ss);
            return (two_mask != 0)
                ? StdRules_HandType_TWOPAIR
                : StdRules_HandType_TRIPS;
            break;

        default:
            four_mask  = (sc & sd) & (sh & ss);
            if (four_mask)
                return StdRules_HandType_QUADS;
            three_mask = (( sc&sd )|( sh&ss )) & (( sc&sh )|( sd&ss ));
            if (three_mask)
                return StdRules_HandType_FULLHOUSE;
            else if (is_st_or_fl)
                return is_st_or_fl;
            else
                return StdRules_HandType_TWOPAIR;

            break;
    };

}


// Дмитрий Онуфриев, [10.07.18 13:32]
// StdDeck_CardMask cards - это то что я рассказывал - структура из 4х интов
//
// Дмитрий Онуфриев, [10.07.18 13:32]
// sc = StdDeck_CardMask_CLUBS(cards);
// sd = StdDeck_CardMask_DIAMONDS(cards);
// sh = StdDeck_CardMask_HEARTS(cards);
// ss = StdDeck_CardMask_SPADES(cards);
//
// Дмитрий Онуфриев, [10.07.18 13:32]
// вот это из структуры извлекаются каждая из 4х мастей
//
// Дмитрий Онуфриев, [10.07.18 13:32]
// в свое число
//
// Дмитрий Онуфриев, [10.07.18 13:33]
// nBitsAndStrTable - вот это захардоженый массив, его просто скопипастишь
//
// Дмитрий Онуфриев, [10.07.18 13:34]
// все, больше особо и знать нечего
//
// Дмитрий Онуфриев, [10.07.18 13:34]
// только арифметические и битовые операции
//
// Дмитрий Онуфриев, [10.07.18 13:35]
// почитай, в принципе там все понятно что делается
//
// Дмитрий Онуфриев, [10.07.18 13:36]
// только таблица стрейтов берется извне для скорости
//
// Дмитрий Онуфриев, [10.07.18 13:36]
// предпосчитанная
//
// Дмитрий Онуфриев, [10.07.18 13:37]
// ranks = sc | sd | sh | ss; - вот это определяется наличие каждого старшинства. | - это побитовое или
//
// Дмитрий Онуфриев, [10.07.18 13:37]
// понятна логика? типа или крест или бубна или черва или пика
//
// Дмитрий Онуфриев, [10.07.18 13:37]
// тогда будет бит 1
//
// Дмитрий Онуфриев, [10.07.18 13:37]
// иначе 0
//
// Дмитрий Онуфриев, [10.07.18 13:38]
// ну вобщем че не ясно спрашивай
//
// Дмитрий Онуфриев, [10.07.18 13:40]
// nBitsAndStrTable - на код с этим пока не смотри
//
// Дмитрий Онуфриев, [10.07.18 13:40]
// это только для определения стрейта
//
// Дмитрий Онуфриев, [10.07.18 13:40]
// считай исключение