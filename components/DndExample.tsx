"use client"

import { cardsData } from "@/lib/CardsData";
import { useEffect, useState } from "react";
import { Draggable, DropResult, Droppable } from "react-beautiful-dnd";
import LoadingSkeleton from "./LoadingSkeleton";
import { DndContext } from "@/context/DndContext";
import styles from './Modal.module.css';
import ConfirmModal from "./ConfirmModal";
import WidgetSelector from '../components/dashboardcreation/WidgetSelector';
import EditModal from "./EditModal";

interface Cards {
    id: number;
    title: string;
    components: {
        id: number;
        widgetId: number;
    }[];
}
const DndExample = () => {
    const [data, setData] = useState<Cards[] | []>([])

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedWidget, setselectedWidget] = useState<number>(0);

    const [confirmModalOpen, setConfirmModalOpen] = useState<boolean>(false);
    const [idToFilter, setIdToFilter] = useState<number>(0);

    const [isLockedLayout, setIsLockedLayout] = useState<boolean>(false);

    const [idToEdit, setIdToEdit] = useState<number>(0);
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

    const handleFilter = () => {
        // Handle confirm action
        console.log(idToFilter);
        setData(data.map(column => ({
            ...column,
            components: column.components.filter(component => component.id !== idToFilter)
        })));
        setConfirmModalOpen(false);
    };

    const handleCancel = () => {
        setConfirmModalOpen(false);
    };

    const handleWidgetSelect = (widgetId: number) => {
        setselectedWidget(widgetId);
    };

    const handleWidgetDeselect = (widgetId: number) => {
        // setselectedWidget(selectedWidget.filter(id => id !== widgetId));
    };

    const handleSaveDashboard = () => {
        setData(prevData => {
            const newData = [...prevData];
            const currentTime = new Date();

            // Extract hours, minutes, and seconds
            const year = currentTime.getFullYear();
            const month = currentTime.getMonth();
            const day = currentTime.getDay();
            const hours = currentTime.getHours();
            const minutes = currentTime.getMinutes();
            const seconds = currentTime.getSeconds();
          
            const component = { id: year + month + day + hours * minutes * seconds, widgetId: selectedWidget };
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

    const editDashboard = () => {
        console.log("changed ", selectedWidget);
        setData(data.map(card => ({
            ...card,
            components: card.components.map(component => {
                if (component.id === idToEdit) {
                    return { ...component, widgetId: selectedWidget };
                }
                return component;
            })
        })));
        console.log(data);
        cancelEditModal();
    }
    const cancelEditModal = () => {
        setIsEditModalOpen(false);
    }


    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const saveLayout = async () => {
        setIsLockedLayout(!isLockedLayout);
        console.log(isLockedLayout);
        if (!isLockedLayout) {
            const res = await fetch("/api/savelayout", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }
    }

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
        if (cardsData.length > 0) {
            const fetchData = async () => {
                const res = await fetch("/api/savelayout", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const resData = await res.json();
                console.log(resData);
                try {
                    cardsData[0] = resData.column1[0];
                    cardsData[1] = resData.column2[0];
                    cardsData[2] = resData.column3[0];
                    cardsData[3] = resData.column4[0];
                } catch {
                }

                setData(cardsData)

            }
            fetchData();
        }
    }, [])
    if (!data.length) {
        return <LoadingSkeleton />
    }
    return (
        <DndContext onDragEnd={onDragEnd}>
            <div className="flex justify-center items-center mb-3">
                <button className={`left-0 mr-2 ${isLockedLayout ? "m-2" : ""}`} onClick={saveLayout}>{isLockedLayout ? <svg fill="#494c4e" version="1.1" id="Capa_1" width="22px" height="26px" viewBox="0 0 574.922 574.922">
                    <g>
                        <g>
                            <path d="M491.102,238.031v-33.892c0-27.472-5.39-54.146-16.021-79.278c-10.26-24.255-24.937-46.028-43.624-64.717
                                c-18.688-18.688-40.462-33.365-64.717-43.623C341.607,5.891,314.934,0.5,287.461,0.5s-54.146,5.391-79.279,16.021
                                c-24.255,10.259-46.028,24.935-64.717,43.623c-18.688,18.688-33.366,40.462-43.624,64.717
                                c-10.63,25.133-16.021,51.806-16.021,79.278v33.892c-29.34,2.925-52.328,27.753-52.328,57.85v220.4
                                c0,32.059,26.082,58.141,58.14,58.141h395.657c32.059,0,58.141-26.082,58.141-58.141v-220.4
                                C543.431,265.784,520.442,240.957,491.102,238.031z M74.333,516.281v-220.4c0-6.391,3.921-11.865,9.489-14.154
                                c1.792-0.736,3.753-1.146,5.812-1.146h15.609h21.42h321.6h21.421h15.608c2.058,0,4.02,0.409,5.812,1.146
                                c5.567,2.289,9.488,7.763,9.488,14.154v220.4c0,8.451-6.85,15.301-15.3,15.301H89.633
                                C81.183,531.582,74.333,524.73,74.333,516.281z M126.662,204.139c0-88.807,71.993-160.799,160.8-160.799l0,0
                                c88.807,0,160.8,71.993,160.8,160.799v33.602h-321.6V204.139L126.662,204.139z"/>
                            <path d="M485.289,574.922H89.632c-32.334,0-58.64-26.306-58.64-58.641v-220.4c0-14.615,5.431-28.626,15.292-39.451
                                c9.692-10.64,22.83-17.322,37.036-18.849v-33.441c0-27.539,5.403-54.277,16.061-79.473c10.283-24.314,24.997-46.141,43.731-64.875
                                c18.733-18.733,40.561-33.446,64.875-43.73C233.184,5.403,259.922,0,287.461,0C315,0,341.739,5.403,366.935,16.061
                                c24.314,10.283,46.142,24.996,64.876,43.73c18.732,18.734,33.446,40.561,43.731,64.875c10.656,25.194,16.06,51.933,16.06,79.473
                                v33.441c14.207,1.527,27.345,8.21,37.037,18.85c9.861,10.825,15.291,24.835,15.291,39.451v220.4
                                C543.93,548.616,517.624,574.922,485.289,574.922z M287.461,1c-27.404,0-54.012,5.377-79.084,15.981
                                c-24.196,10.234-45.916,24.875-64.558,43.516c-18.643,18.643-33.284,40.363-43.517,64.558
                                c-10.604,25.072-15.981,51.679-15.981,79.083v34.345l-0.451,0.045c-14.132,1.409-27.218,8.005-36.846,18.575
                                c-9.693,10.64-15.031,24.412-15.031,38.777v220.4c0,31.783,25.857,57.641,57.64,57.641h395.657
                                c31.783,0,57.641-25.857,57.641-57.641v-220.4c0-14.366-5.338-28.137-15.03-38.777c-9.628-10.569-22.714-17.166-36.848-18.575
                                l-0.45-0.045v-34.345c0-27.406-5.377-54.014-15.981-79.083c-10.234-24.195-24.875-45.916-43.517-64.558
                                c-18.643-18.642-40.363-33.283-64.558-43.516C341.474,6.377,314.866,1,287.461,1z M485.291,532.082H89.633
                                c-8.712,0-15.8-7.088-15.8-15.801v-220.4c0-6.432,3.846-12.169,9.799-14.616c1.91-0.785,3.93-1.183,6.001-1.183h395.658
                                c2.072,0,4.091,0.398,6.002,1.183c5.952,2.447,9.798,8.185,9.798,14.616v220.4C501.091,524.994,494.003,532.082,485.291,532.082z
                                    M89.633,281.082c-1.941,0-3.832,0.373-5.622,1.108c-5.576,2.292-9.179,7.667-9.179,13.691v220.4
                                c0,8.161,6.639,14.801,14.8,14.801h395.658c8.16,0,14.8-6.64,14.8-14.801v-220.4c0-6.024-3.603-11.399-9.179-13.691
                                c-1.789-0.735-3.681-1.108-5.621-1.108H89.633z M448.762,238.241h-322.6v-34.102c0-88.941,72.359-161.299,161.3-161.299
                                s161.3,72.358,161.3,161.299V238.241z M127.162,237.241h320.6v-33.102c0-88.389-71.91-160.299-160.3-160.299
                                c-88.39,0-160.3,71.91-160.3,160.299V237.241z"/>
                        </g>
                        <g>
                            <path d="M287.461,302.375c-34.337,0-62.272,27.936-62.272,62.273c0,26.639,16.816,49.422,40.388,58.299v40.58v8.488
                                c0,5.18,1.838,9.93,4.898,13.635c3.928,4.756,9.871,7.787,16.521,7.787c6.609,0,12.518-2.996,16.447-7.701
                                c3.104-3.717,4.973-8.5,4.973-13.721v-8.357v-40.369c24.059-8.623,41.317-31.652,41.317-58.641
                                C349.734,330.311,321.799,302.375,287.461,302.375z M287.461,384.082c-10.732,0-19.433-8.701-19.433-19.434
                                s8.701-19.434,19.433-19.434s19.433,8.701,19.433,19.434S298.194,384.082,287.461,384.082z"/>
                            <path d="M286.997,493.938c-6.562,0-12.724-2.904-16.907-7.969c-3.233-3.914-5.013-8.869-5.013-13.953v-48.724
                                c-24.171-9.257-40.388-32.779-40.388-58.644c0-34.613,28.16-62.773,62.772-62.773s62.773,28.16,62.773,62.773
                                c0,26.31-16.59,49.972-41.317,58.991v48.376c0,5.125-1.808,10.111-5.089,14.041C299.646,491.065,293.511,493.938,286.997,493.938z
                                M287.461,302.875c-34.062,0-61.772,27.712-61.772,61.773c0,25.566,16.101,48.807,40.064,57.831l0.324,0.122v49.414
                                c0,4.852,1.699,9.581,4.784,13.316c3.992,4.833,9.874,7.605,16.136,7.605c6.216,0,12.071-2.741,16.063-7.521
                                c3.132-3.751,4.856-8.51,4.856-13.4v-49.078l0.331-0.119c24.516-8.786,40.986-32.163,40.986-58.17
                                C349.234,330.587,321.523,302.875,287.461,302.875z M287.461,384.582c-10.991,0-19.933-8.942-19.933-19.934
                                s8.942-19.934,19.933-19.934s19.933,8.942,19.933,19.934S298.452,384.582,287.461,384.582z M287.461,345.715
                                c-10.439,0-18.933,8.493-18.933,18.934s8.493,18.934,18.933,18.934c10.44,0,18.933-8.493,18.933-18.934
                                S297.901,345.715,287.461,345.715z"/>
                        </g>
                    </g>
                </svg> : <svg height="24" viewBox="0 0 24 24" width="24"><g fill="#494c4e"><path d="m19 1h-1c-2.76 0-5 2.24-5 5v3h-11c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-11c0-1.1-.9-2-2-2h-1v-3c0-1.65 1.35-3 3-3h1c1.65 0 3 1.35 3 3v6c0 .55.45 1 1 1s1-.45 1-1v-6c0-2.76-2.24-5-5-5zm-3.5 10c.28 0 .5.22.5.5v10c0 .27-.22.5-.5.5h-13c-.28 0-.5-.22-.5-.5v-10c0-.27.22-.5.5-.5z" /><path d="m11 15c0 .74-.4 1.38-1 1.73v2.27c0 .55-.45 1-1 1s-1-.45-1-1v-2.27c-.6-.35-1-.99-1-1.73 0-1.1.9-2 2-2s2 .9 2 2z" /></g></svg>}</button>
                {
                    isLockedLayout ? <span className="text-sm">Locked Layout</span> : <><span className="text-sm">Unlocked Layout</span><button className="mx-10 px-4 py-2 rounded-xl border border-white" onClick={openModal}>Add Widget</button></>
                }
            </div>
            <div className="grid grid-cols-4 px-2">
                {
                    isLockedLayout ?
                        data.map((val, index) => {
                            return (
                                <div className="w-full bg-transparent  border-gray-400">
                                    {
                                        val.components?.map((component, index) => {
                                            return (
                                                <div className="bg-gray-200 mx-1 my-1 rounded-lg h-64 text-black">
                                                    <div className="px-2 py-2 border bg-white rounded-lg h-full text-lg">
                                                        <div className="flex justify-end items-center right-0 my-3">
                                                        </div>
                                                        <div>
                                                            <span>{component.widgetId}</span><br />
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        })
                        :
                        data.map((val, index) => {
                            return (
                                <Droppable key={index} droppableId={`droppable${index}`}>
                                    {
                                        (provided) => (
                                            <div className="w-full bg-transparent  border-gray-400"
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                            >
                                                {
                                                    val.components?.map((component, index) => {
                                                        return (
                                                            <Draggable key={component.id} draggableId={component.id.toString()} index={index}>
                                                                {
                                                                    (provided) => (
                                                                        <div className="bg-gray-200 mx-1 my-1 rounded-lg h-64 text-black border-2 border-pink-500"
                                                                            {...provided.dragHandleProps}
                                                                            {...provided.draggableProps}
                                                                            ref={provided.innerRef}
                                                                        >
                                                                            <div className="px-2 py-2 border bg-white rounded-lg h-full text-lg">
                                                                                <div className="flex justify-end items-center right-0">
                                                                                    <button className="p-1" onClick={() => {
                                                                                        setselectedWidget(component.widgetId);
                                                                                        setIdToEdit(component.id);
                                                                                        setIsEditModalOpen(true);
                                                                                    }}>
                                                                                        <svg fill="#808080" version="1.1" id="Capa_1" width="12px" height="12px" viewBox="0 0 494.936 494.936">
                                                                                            <g>
                                                                                                <g>
                                                                                                    <path d="M389.844,182.85c-6.743,0-12.21,5.467-12.21,12.21v222.968c0,23.562-19.174,42.735-42.736,42.735H67.157
                                                                                                        c-23.562,0-42.736-19.174-42.736-42.735V150.285c0-23.562,19.174-42.735,42.736-42.735h267.741c6.743,0,12.21-5.467,12.21-12.21
                                                                                                        s-5.467-12.21-12.21-12.21H67.157C30.126,83.13,0,113.255,0,150.285v267.743c0,37.029,30.126,67.155,67.157,67.155h267.741
                                                                                                        c37.03,0,67.156-30.126,67.156-67.155V195.061C402.054,188.318,396.587,182.85,389.844,182.85z"/>
                                                                                                    <path d="M483.876,20.791c-14.72-14.72-38.669-14.714-53.377,0L221.352,229.944c-0.28,0.28-3.434,3.559-4.251,5.396l-28.963,65.069
                                                                                                        c-2.057,4.619-1.056,10.027,2.521,13.6c2.337,2.336,5.461,3.576,8.639,3.576c1.675,0,3.362-0.346,4.96-1.057l65.07-28.963
                                                                                                        c1.83-0.815,5.114-3.97,5.396-4.25L483.876,74.169c7.131-7.131,11.06-16.61,11.06-26.692
                                                                                                        C494.936,37.396,491.007,27.915,483.876,20.791z M466.61,56.897L257.457,266.05c-0.035,0.036-0.055,0.078-0.089,0.107
                                                                                                        l-33.989,15.131L238.51,247.3c0.03-0.036,0.071-0.055,0.107-0.09L447.765,38.058c5.038-5.039,13.819-5.033,18.846,0.005
                                                                                                        c2.518,2.51,3.905,5.855,3.905,9.414C470.516,51.036,469.127,54.38,466.61,56.897z"/>
                                                                                                </g>
                                                                                            </g>
                                                                                        </svg>
                                                                                    </button>
                                                                                    <button className="p-1" onClick={() => {
                                                                                        setIdToFilter(component.id);
                                                                                        setConfirmModalOpen(true);
                                                                                    }}>
                                                                                        <svg fill="#000000" height="8px" width="8px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31.112 31.112">
                                                                                            <polygon points="31.112,1.414 29.698,0 15.556,14.142 1.414,0 0,1.414 14.142,15.556 0,29.698 1.414,31.112 15.556,16.97 29.698,31.112 31.112,29.698 16.97,15.556 " />
                                                                                        </svg>
                                                                                    </button>
                                                                                    <EditModal isOpen={isEditModalOpen} idToEdit={selectedWidget} onClose={cancelEditModal} onEdit={editDashboard} widgetSelect={handleWidgetSelect} widgetDeselect={handleWidgetDeselect} />
                                                                                    <ConfirmModal isOpen={confirmModalOpen} onClose={handleCancel} onConfirm={handleFilter} />
                                                                                </div>
                                                                                <div>
                                                                                    <span>{component.widgetId}</span><br />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                }
                                                            </Draggable>
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
                    <div className={`${styles.modal} ${isModalOpen ? styles.open : ''}`}>
                        <div className={styles.overlay} onClick={closeModal}></div>
                        <div className={styles.content}>
                            <button className={styles.closeButton} onClick={closeModal}>
                                <svg fill="#000000" height="8px" width="8px" version="1.1" id="Capa_1" viewBox="0 0 31.112 31.112">
                                    <polygon points="31.112,1.414 29.698,0 15.556,14.142 1.414,0 0,1.414 14.142,15.556 0,29.698 1.414,31.112 15.556,16.97 29.698,31.112 31.112,29.698 16.97,15.556 " />
                                </svg>
                            </button>
                            <div className="mt-8">
                                <span className="text-2xl font-bold">Create New Dashboard</span>
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
