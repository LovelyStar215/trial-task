"use client"

import { cardsData } from "@/lib/CardsData";
import { useEffect, useState } from "react";
import { Draggable, DropResult, Droppable } from "react-beautiful-dnd";
import LoadingSkeleton from "./LoadingSkeleton";
import { DndContext } from "@/context/DndContext";
import styles from './Modal.module.css';

import DashboardCreationForm from '../components/dashboardcreation/DashboardCreationForm';
import WidgetSelector from '../components/dashboardcreation/WidgetSelector';

interface Cards {
    id: number;
    title: string;
    components: {
        id: number;
        name: string;
    }[];
}
const DndExample = () => {
    const [dashboardName, setDashboardName] = useState<string>('');
    const [selectedWidget, setselectedWidget] = useState<string>("None");
    const [data, setData] = useState<Cards[] | []>([])
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleNameChange = (name: string) => {
        setDashboardName(name);
    };

    const handleWidgetSelect = (widgetId: string) => {
        setselectedWidget(widgetId);
    };

    const handleWidgetDeselect = (widgetId: string) => {
        // setselectedWidget(selectedWidget.filter(id => id !== widgetId));
    };

    const handleSaveDashboard = () => {
        const id = 0;
        setData(prevData => {
            const newData = [...prevData];
            const component = { id: newData[0].components.length + 10, name: selectedWidget };
            if (newData.length > 0) {
                const newWidget = [...newData[0].components];
                newWidget.push(component);
                newData[0] = { ...newData[0], components: newWidget };
            }
            return newData;
        })
        console.log(data);
        closeModal();
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;
        if (!destination) return;
        if (source.droppableId !== destination.droppableId) {
            const newData = [...JSON.parse(JSON.stringify(data))];//shallow copy concept
            const oldDroppableIndex = newData.findIndex(x => x.id == source.droppableId.split("droppable")[1]);
            const newDroppableIndex = newData.findIndex(x => x.id == destination.droppableId.split("droppable")[1])
            const [item] = newData[oldDroppableIndex].components.splice(source.index, 1);
            newData[newDroppableIndex].components.splice(destination.index, 0, item);
            setData([...newData]);
            // const temp = newData[oldDroppableIndex];
            // newData[oldDroppableIndex] = newData[newDroppableIndex];
            // newData[newDroppableIndex] = temp;
            // setData(newData);
        }
        else {
            const newData = [...JSON.parse(JSON.stringify(data))];//shallow copy concept
            const droppableIndex = newData.findIndex(x => x.id == source.droppableId.split("droppable")[1]);
            const [item] = newData[droppableIndex].components.splice(source.index, 1);
            newData[droppableIndex].components.splice(destination.index, 0, item);
            setData([...newData]);
        }
    };
    useEffect(() => {
        setData(cardsData)
    }, [])
    if (!data.length) {
        return <LoadingSkeleton />
    }
    const deleteDashboard = (id: number) => {
        console.log(id);
        const filteredData: Cards[] = data.map(column => ({
            ...column,
            components: column.components.filter(component => component.id !== id)
        }));
        setData(filteredData);
    }
    return (
        <DndContext onDragEnd={onDragEnd}>
            <span className="text-center mb-3 font-bold text-[25px] ">Drag and Drop Application</span>
            <button className="mx-10 px-4 py-2 rounded-xl border border-white" onClick={openModal}>Add Widget</button>

            <div className="grid grid-cols-4 px-2">
                {
                    data.map((val, index) => {
                        return (
                            <Droppable key={index} droppableId={`droppable${index}`}>
                                {
                                    (provided) => (
                                        <div className="w-full bg-transparent  border-gray-400"
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                        >
                                            {/* <h2 className="text-center font-bold mb-6 text-black">{val.title}</h2> */}
                                            {
                                                val.components?.map((component, index) => {
                                                    return (
                                                        <>
                                                            <Draggable key={component.id} draggableId={component.id.toString()} index={index}>
                                                                {
                                                                    (provided) => (
                                                                        <div className="bg-gray-200 mx-1 my-1 rounded-lg h-64 text-black"
                                                                            {...provided.dragHandleProps}
                                                                            {...provided.draggableProps}
                                                                            ref={provided.innerRef}
                                                                        >
                                                                            <div className="px-2 py-2 border bg-white rounded-lg h-full text-lg">
                                                                                <div className="flex justify-end items-center right-0">
                                                                                    <button className="p-1" onClick={() => deleteDashboard(component.id)}>
                                                                                        <svg fill="#000000" height="8px" width="8px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31.112 31.112">
                                                                                            <polygon points="31.112,1.414 29.698,0 15.556,14.142 1.414,0 0,1.414 14.142,15.556 0,29.698 1.414,31.112 15.556,16.97 29.698,31.112 31.112,29.698 16.97,15.556 " />
                                                                                        </svg>
                                                                                    </button>
                                                                                </div>
                                                                                <div>
                                                                                    <span>{component.name}</span><br />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                }
                                                            </Draggable>
                                                        </>
                                                    )
                                                })
                                            }
                                        </div>
                                    )
                                }

                            </Droppable>
                        )
                    })
                }

            </div>
            <div>
                {isModalOpen && (
                    // <Modal onClose={closeModal} children>
                    //     <h2>This is a modal</h2>
                    //     <p>Modal content goes here...</p>
                    // </Modal>
                    <div className={`${styles.modal} ${isModalOpen ? styles.open : ''}`}>
                        <div className={styles.overlay} onClick={closeModal}></div>
                        <div className={styles.content}>
                            <button className={styles.closeButton} onClick={closeModal}>
                                <svg fill="#000000" height="8px" width="8px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31.112 31.112">
                                    <polygon points="31.112,1.414 29.698,0 15.556,14.142 1.414,0 0,1.414 14.142,15.556 0,29.698 1.414,31.112 15.556,16.97 29.698,31.112 31.112,29.698 16.97,15.556 " />
                                </svg>
                            </button>
                            <div className="mt-8">
                                <span className="text-2xl font-bold">Create New Dashboard</span>
                                <DashboardCreationForm onNameChange={handleNameChange} />
                                <WidgetSelector
                                    selectedWidget={selectedWidget}
                                    onWidgetSelect={handleWidgetSelect}
                                    onWidgetDeselect={handleWidgetDeselect}
                                />
                                <button className="border border-black px-2 py-1 rounded-lg my-3" onClick={handleSaveDashboard}>Create Dashboard</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DndContext>
    )
};

export default DndExample;
