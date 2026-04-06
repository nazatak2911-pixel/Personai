import MyPlaceholder from './MyPlaceholder';
import { useLanguage } from '../context/LanguageContext';

export const MyNetwork = () => {
    const { t } = useLanguage();
    return <MyPlaceholder title={t.buildNetwork} />;
};

export const MyCV = () => {
    const { t } = useLanguage();
    return <MyPlaceholder title={t.myCV} />;
};

export const MySimulations = () => {
    const { t } = useLanguage();
    return <MyPlaceholder title={t.jobSimulations} />;
};

export const MyInternships = () => {
    const { t } = useLanguage();
    return <MyPlaceholder title={t.internshipOpportunities} />;
};

export const MyPersonai = () => {
    return <MyPlaceholder title="PERSONAI" />;
};
