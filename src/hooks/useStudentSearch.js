import { useMemo } from "react";

export function useStudentSearch(students, search) {
    return useMemo(() => {
        if (!search) return []

        return students.filter(student => 
            ['name', 'email'].some(field => 
                student[field]?.toString().toLowerCase().includes(search.toLowerCase())
            )
        )
    }, [students, search])
}