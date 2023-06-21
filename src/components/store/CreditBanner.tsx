import { useTheme } from '../../context/ThemeContext';


const UNSPLASH_URL: string = 'https://unsplash.com/?utm_source=cartotype&utm_medium=referral';
const CREDITOR_URL = (username: string) => `https://unsplash.com/@${username}?utm_source=cartotype&utm_medium=referral`;


type CreditBannerProps = {
    creditorDisplayName: string;
    // currentTheme: string;
}


export function CreditBanner({ creditorDisplayName }: CreditBannerProps) {

    const { currentTheme } = useTheme();

    return (
        <span className={`credit-text credit-text-${currentTheme}`}>
            Photo by&nbsp;
            <a href={CREDITOR_URL(creditorDisplayName)} target="_blank" rel="noreferrer">
                {creditorDisplayName}
            </a> on&nbsp;
            <a href={UNSPLASH_URL} target="_blank" rel="noreferrer">
                Unsplash
            </a>
        </span>
    )

}