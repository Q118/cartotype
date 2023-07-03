


type CreditBannerProps = {
    creditorDisplayName: string;
    // currentTheme: string;
}

const UNSPLASH_URL: string = 'https://unsplash.com/?utm_source=cartotype&utm_medium=referral';
const CREDITOR_URL = (username: string) => `https://unsplash.com/@${username}?utm_source=cartotype&utm_medium=referral`;


export function CreditBanner({ creditorDisplayName }: CreditBannerProps) {


    return (
        <span className="credit-text text-center">
            Photo by&nbsp;
            <a href={CREDITOR_URL(creditorDisplayName)} target="_blank" rel="noreferrer" className="credit-link-user">
                {creditorDisplayName}
            </a> on&nbsp;
            <a href={UNSPLASH_URL} target="_blank" rel="noreferrer" className="credit-link-unsplash">
                Unsplash
            </a>
        </span>
    )

}