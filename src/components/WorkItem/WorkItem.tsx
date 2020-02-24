import React, {useState} from "react";
import './WorkItem.scss';
import {Link} from "react-router-dom";
import {toSeoUrl} from "../../utils/toSeoUrl";

export interface WorkItem {
    id: number,
    fileName: string,
    imageName: string
}

interface WorkItemProps {
    workItem: WorkItem,
}

export const WorkItem = ({workItem}: WorkItemProps) => {
    const [imageLoaded, setImageLoaded] = useState<boolean>(false);

    const showDescOverlay = () => {
        return <div className={'WorkItem__desc-overlay'}>
            <div className={'WorkItem__desc'}>{workItem.imageName}</div>
        </div>;
    };

    const showPlaceholder = () => {
        return <div className={'WorkItem__placeholder'}/>;
    };

    return <div className="WorkItem">
        <Link className={'WorkItem__image-wrap'}
              to={`/work/${toSeoUrl(workItem.imageName)}`}>
            <img className={'WorkItem__image'} onLoad={() => setImageLoaded(true)}
                 src={require(`../../images/${workItem.fileName}-sm.jpg`)}
                 alt={`Vernal Bloom - ${workItem.imageName}`}/>
            {imageLoaded && showDescOverlay()}
            {!imageLoaded && showPlaceholder()}
        </Link>
    </div>
};