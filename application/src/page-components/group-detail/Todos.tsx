import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import {
  IoIosAdd,
  IoIosCalendar,
  IoIosCheckmark,
  IoIosCreate,
  IoIosEye,
  IoIosTrash,
} from "react-icons/io";
import { Todo } from "../../@core/models";
import Badge from "../../components/Badge";
import Button from "../../components/Button";
import Loading from "../../components/Loading";
import CreateTodoModal from "../../components/modal/CreateTodoModal";
import TodoInfoModal from "../../components/modal/TodoInfoModal";
import UpdateTodoModal from "../../components/modal/UpdateTodoModal";
import { USER_UPLOADS } from "../../constants/config";
import { TODO_TYPES } from "../../constants/data";
import { PRIORITY, promiseRequest } from "../../constants/helpers";
import { Colors } from "../../constants/theme";
import { GroupContext } from "../../store/group";
import { TodoContext } from "../../store/todo";

interface ITodoItemProps {
  todo: Todo;
}

const TodoItem = ({ todo }: ITodoItemProps) => {
  const [todoModalShow, setTodoModalShow] = useState<boolean>(false);
  const [todoInfoModalShow, setTodoInfoModalShow] = useState<boolean>(false);

  const todoStore = useContext(TodoContext);

  return (
    <>
      <li className="d-flex align-items-center justify-content-between mb-3">
        <div
          className="d-flex align-items-center"
          style={{ gap: 12, width: 100 + "%", maxWidth: 30 + "%" }}
        >
          <div
            style={{
              backgroundColor: Colors.Primary,
              width: 15,
              height: 15,
              borderRadius: 15,
            }}
          ></div>
          <h6>
            <span className="me-2">
              {todo.todoText.length > 25
                ? todo.todoText.slice(0, 25)
                : todo.todoText}
            </span>

            {todo.todoText.length > 25 && (
              <IoIosEye onClick={() => setTodoInfoModalShow(true)} className="cursor-pointer" size={23} />
            )}
          </h6>
        </div>

        <div style={{ width: 100 + "%", maxWidth: 10 + "%" }}>
          <Badge type={todo.todoType} />
        </div>

        <div
          style={{ width: 100 + "%", maxWidth: 20 + "%" }}
          className="d-flex align-items-center justify-content-center"
        >
          <IoIosCalendar size={22} color={Colors.Primary} className="me-2" />
          <h6 className="text-main-primary">
            {new Date(todo.todoCreatedAt * 1000).toLocaleString()}
          </h6>
        </div>

        <div
          className="d-flex align-items-center justify-content-center"
          style={{
            width: 100 + "%",
            maxWidth: 5 + "%",
          }}
        >
          <img
            src={USER_UPLOADS + todo.todoCreator?.profileURL}
            style={{
              width: 30,
              height: 30,
              borderRadius: 30,
            }}
          />
        </div>
        <div
          style={{ width: 100 + "%", maxWidth: 20 + "%", gap: 12 }}
          className="d-flex align-items-center justify-content-center"
        >
          <Button
            event={() => setTodoModalShow(true)}
            title={
              <>
                <IoIosCreate size={26} color="#fff" />
              </>
            }
            bg={Colors.Success}
            buttonStyles={{
              padding: 6,
              boxShadow: "none",
            }}
            textStyles={{ color: "#fff", fontSize: 15 }}
          />
          <Button
            event={async () => {
              await promiseRequest({
                event: () => todoStore.deleteTodo(todo.todoID),
              });
            }}
            title={
              <>
                <IoIosTrash size={26} color="#fff" />
              </>
            }
            bg={Colors.Danger}
            buttonStyles={{
              padding: 6,
              boxShadow: "none",
            }}
            textStyles={{ color: "#fff", fontSize: 15 }}
          />
        </div>
      </li>
      <UpdateTodoModal
        show={todoModalShow}
        onShow={setTodoModalShow}
        todo={todo}
      />
      <TodoInfoModal
        show={todoInfoModalShow}
        onShow={setTodoInfoModalShow}
        text={todo.todoText}
      />
    </>
  );
};

const Todos = () => {
  const groupStore = useContext(GroupContext);
  const todoStore = useContext(TodoContext);

  const [createTodoModalShow, setCreateTodoModalShow] = useState(false);

  const handleChangePriority = (e: any) => {
    todoStore.setPriority(e.target.value);
    groupStore.setCurrentGroup({
      ...groupStore.currentGroup,
      todos: PRIORITY({
        type: e.target.value,
        todos: groupStore.currentGroup!.todos,
      }),
    });
  };

  return (
    <>
      <div className="mt-3">
        <div
          className="d-flex align-items-center justify-content-between"
          style={{
            borderWidth: 1,
            borderBottomColor: "#eee",
          }}
        >
          <h2 className="fw-bold mb-4">{groupStore.currentGroup?.groupName}</h2>
          <select
            style={{
              flex: 0.3,
            }}
            onChange={handleChangePriority}
            value={todoStore.priority}
          >
            <option value="" selected disabled>
              SELECT PRIORITY - Default: Urgent
            </option>
            <option value={TODO_TYPES.URGENT}>
              Priority - {TODO_TYPES.URGENT}
            </option>
            <option value={TODO_TYPES.REGULAR}>
              Priority - {TODO_TYPES.REGULAR}
            </option>
            <option value={TODO_TYPES.TRIVIAL}>
              Priority - {TODO_TYPES.TRIVIAL}
            </option>
          </select>
        </div>

        <div className="d-flex align-items-center justify-content-between">
          <h4>Todos</h4>
          <Button
            event={() => setCreateTodoModalShow(true)}
            title={
              <>
                <IoIosAdd size={26} color="#fff" />
              </>
            }
            bg={Colors.Primary}
            buttonStyles={{
              padding: 6,
            }}
            textStyles={{ color: "#fff", fontSize: 15 }}
          />
        </div>

        {!groupStore.currentGroupLoading &&
          groupStore.currentGroup?.todos.length == 0 && (
            <h6 className="text-main-primary">You have not some todo!</h6>
          )}

        {groupStore.currentGroupLoading && (
          <Loading
            styles={{
              marginTop: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 100 + "%",
            }}
            isLoading={groupStore.currentGroupLoading}
            properties={{
              size: 32,
              color: Colors.Primary,
            }}
          />
        )}
        {!groupStore.currentGroupLoading &&
          groupStore.currentGroup?.todos.length! > 0 &&
          groupStore.currentGroup?.todos.map((todo: Todo, idx: number) => (
            <TodoItem todo={todo} key={idx} />
          ))}
      </div>
      <CreateTodoModal
        show={createTodoModalShow}
        onShow={setCreateTodoModalShow}
      />
    </>
  );
};

export default Todos;
