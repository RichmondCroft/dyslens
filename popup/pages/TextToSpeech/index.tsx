import { Slider, Switch } from "@mui/material";
import { ChangeEvent, useContext, useState } from "react";

import StoreContext from "~popup/storage/StoreContext";
import ComponentContainer from "~popup/components/ComponentContainer";

export default function TextToSpeech() {
    const { appData, setAppState } = useContext(StoreContext);
    const [pitch, setPitch] = useState(appData.textToSpeech.pitch);
    const [rate, setRate] = useState(appData.textToSpeech.rate);
    const [volume, setVolume] = useState(appData.textToSpeech.volume)

    function handleOnEnableChange(_event: ChangeEvent<HTMLInputElement>, checked: boolean) {
        setAppState({
            ...appData,
            textToSpeech: {
                ...appData.textToSpeech,
                enabled: checked
            }
        })
    }

    function handleOnPitchChange(_event: Event, newValue: number) {
        setPitch(newValue)
    }

    function handleOnPitchChangeCommitted(_event: Event, newValue: number) {
        setAppState({
            ...appData,
            textToSpeech: {
                ...appData.textToSpeech,
                pitch: pitch
            }
        })
    }

    function handleOnRateChange(_event: Event, newValue: number) {
        setRate(newValue)

    }

    function handleOnRateChangeCommitted(_event: Event, newValue: number) {
        setAppState({
            ...appData,
            textToSpeech: {
                ...appData.textToSpeech,
                rate: rate
            }
        })
    }

    function handleOnVolumeChange(_event: Event, newValue: number) {
        setVolume(newValue)

    }

    function handleOnVolumeChangeCommitted(_event: Event, newValue: number) {
        setAppState({
            ...appData,
            textToSpeech: {
                ...appData.textToSpeech,
                volume: volume
            }
        })
    }


    return <div>
        <ComponentContainer label="Enabled" horizontal>
            <Switch
                checked={appData.textToSpeech.enabled}
                onChange={handleOnEnableChange}
                data-testId="text-to-speech-settings-switch"
            />
        </ComponentContainer>
        <ComponentContainer label="Pitch">
            <Slider
                value={pitch}
                min={0}
                max={2}
                step={0.5}
                onChange={handleOnPitchChange}
                onChangeCommitted={handleOnPitchChangeCommitted}
            />
        </ComponentContainer>
        <ComponentContainer label="Rate">
            <Slider
                value={rate}
                min={0.1}
                max={10}
                step={0.5}
                onChange={handleOnRateChange}
                onChangeCommitted={handleOnRateChangeCommitted}
            />
        </ComponentContainer>
        <ComponentContainer label="Volume">
            <Slider
                value={volume}
                min={0}
                max={1}
                onChange={handleOnVolumeChange}
                onChangeCommitted={handleOnVolumeChangeCommitted}

            />
        </ComponentContainer>
    </div>
}