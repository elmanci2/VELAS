

export interface _Props {

    id:string
    uri: string
    title: string
    sizeIConst?: number
    timePosition?: React.Dispatch<React.SetStateAction<number>>
    loadScreen: boolean
    refresh?: boolean,
    setrefresh?: any
}

export interface FullScreen {
    zizemode: 'cover' | 'contain'
}


export type _statusTYpe = {

    androidImplementation: () => never[]
    audioPan: number,
    didJustFinish: boolean,
    durationMillis: number,
    isBuffering: boolean,
    isLoaded: true,
    isLooping: boolean,
    isMuted: boolean,
    isPlaying: boolean,
    playableDurationMillis: number,
    positionMillis: number,
    progressUpdateIntervalMillis: number,
    rate: number,
    shouldCorrectPitch: boolean,
    shouldPlay: boolean,
    uri: string
    volume: number,

}


