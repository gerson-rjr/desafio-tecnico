export default function PeopleCard({image: image, people: people, generalInfo: generalInfo, state: state}) {
    return (
        <div className="flex">
            <div>
                <img src={image} className="h-35 w-35 min-w-35 rounded-full" />
            </div>
            <div className="p-10 flex items-center">
                <ul className="text-center flex-col">
                    <li className="text-2xl">{people}</li>
                    <li className="text-sm">{generalInfo}</li>
                    <li className="text-sm">{state}</li>
                </ul>
            </div>
        </div>
    )
}
