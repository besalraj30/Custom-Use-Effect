import { useRef } from "react";

const useCustomEffect = (callback, dependency) => {
    //Using useRef because it persists across re renders
    const initialRender = useRef(true);

    //  for checking change in dependency
    const prevDependency = useRef([]);

    //  First render only case
    if(initialRender.current)
    {
        initialRender.current = false;
        //Calling cleanup
        const cleanup = callback();
        return () => {
            if(cleanup && typeof cleanup === "function")
            {
                cleanup();
            }
        };
    }

    //Dependency array and every render condition
    //Last true is when there is no dependency array
    const dependencyChanged = dependency ? (JSON.stringify(dependency)!==JSON.stringify(prevDependency.current)) : true;

    if(dependencyChanged)
    {
        const cleanup = callback();
        //For cleanup it is important for dependency array to be present
        if(cleanup && typeof cleanup === "function" && dependency)
        {
            cleanup();
        }
    }

    //Cleanup is called when - component unmounts (cannot replicate), dependency array changes (after first render case & if dependency array changes)

    prevDependency.current = dependency || [];
}

export default useCustomEffect;