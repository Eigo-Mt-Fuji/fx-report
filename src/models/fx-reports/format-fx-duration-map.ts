import { FxDailySummaryDurationCountEntry } from '../../types';

const DURATION_KEY_OVER_1_WEEK = '1週間より長い';
const DURATION_KEY_1_WEEK = '1週間';
const DURATION_KEY_1_DAY = '1日';
const DURATION_KEY_1_HOUR = '1時間';
const DURATION_KEY_15_MINUTES = '15分';
const DURATION_KEY_5_MINUTES = '5分';
const DURATION_KEY_1_MINUTES = '1分';

const DURATION_1_WEEK: number = 7 * 24 * 60 * 60;
const DURATION_1_DAY: number = 1 * 24 * 60 * 60;
const DURATION_1_HOUR: number = 1 * 60 * 60;
const DURATION_15_MINUTES: number = 15 * 60;
const DURATION_5_MINUTES: number = 5 * 60;
const DURATION_1_MINUTES = 60;

/**
 * formatFxDurationMap
 * @param durations 
 */
export default function formatFxDurationMap(durations: number[]) : FxDailySummaryDurationCountEntry {

    const initial: FxDailySummaryDurationCountEntry = {};
    initial[DURATION_KEY_OVER_1_WEEK] = 0;
    initial[DURATION_KEY_1_WEEK] = 0;
    initial[DURATION_KEY_1_DAY] = 0;
    initial[DURATION_KEY_1_HOUR] = 0;
    initial[DURATION_KEY_15_MINUTES] = 0;
    initial[DURATION_KEY_5_MINUTES] = 0;
    initial[DURATION_KEY_1_MINUTES] = 0;

    return durations.reduce( (acc, duration) => {
        let classificationKey = null;

        if (duration > DURATION_1_WEEK) {

            classificationKey = DURATION_KEY_OVER_1_WEEK;
        }else if (duration > DURATION_1_DAY) {

            classificationKey = DURATION_KEY_1_WEEK;
        }else if (duration > DURATION_1_HOUR) {   

            classificationKey = DURATION_KEY_1_DAY;
        }else if (duration > DURATION_15_MINUTES) {

            classificationKey = DURATION_KEY_1_HOUR;
        }else if (duration > DURATION_5_MINUTES) {

            classificationKey = DURATION_KEY_15_MINUTES;
        }else if (duration > DURATION_1_MINUTES) {

            classificationKey = DURATION_KEY_5_MINUTES;
        }else {

            classificationKey = DURATION_KEY_1_MINUTES;
        }

        acc[classificationKey] = acc[classificationKey] + 1;

        return acc;
    }, initial);
}