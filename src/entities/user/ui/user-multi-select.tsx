"use client";

import {
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  Check,
  Search,
  X,
} from 'lucide-react';

import { useUsersQuery } from '@/entities/user/model/use-users.query';
import { cn } from '@/shared/lib';
import { useDebounce } from '@/shared/lib/use-debounce';
import { Input } from '@/shared/ui/kit';

type SelectedUser = {
  id: string;
  fio: string;
  email: string;
};

type UserMultiSelectProps = {
  value: string[];
  onChange: (value: string[]) => void;
  label?: string;
  placeholder?: string;
  error?: string;
};

export function UserMultiSelect({
  value,
  onChange,
  label = "Пользователи",
  placeholder = "Поиск пользователей",
  error,
}: UserMultiSelectProps) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<SelectedUser[]>([]);

  const searchContainerRef = useRef<HTMLDivElement>(null);

  const debouncedSearch = useDebounce(search, 300);

  const { data, isLoading } = useUsersQuery({
    search: debouncedSearch || undefined,
    limit: 20,
  });

  const users = data?.items ?? [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleUser = (user: SelectedUser) => {
    const isSelected = value.includes(user.id);

    if (isSelected) {
      const nextSelectedUsers = selectedUsers.filter(
        (item) => item.id !== user.id,
      );

      setSelectedUsers(nextSelectedUsers);
      onChange(nextSelectedUsers.map((item) => item.id));

      return;
    }

    const nextSelectedUsers = [...selectedUsers, user];

    setSelectedUsers(nextSelectedUsers);
    onChange(nextSelectedUsers.map((item) => item.id));

    setSearch("");
  };

  const removeUser = (userId: string) => {
    const nextSelectedUsers = selectedUsers.filter(
      (user) => user.id !== userId,
    );

    setSelectedUsers(nextSelectedUsers);
    onChange(nextSelectedUsers.map((item) => item.id));
  };

  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-heading font-semibold">{label}</label>}

      {selectedUsers.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedUsers.map((user) => (
            <span
              key={user.id}
              className="inline-flex items-center gap-1 rounded-md bg-primary-light px-2 py-1 text-sm"
            >
              <span className="max-w-50 truncate">{user.fio}</span>

              <button
                type="button"
                onClick={() => removeUser(user.id)}
                className="text-text-muted hover:text-foreground"
                aria-label={`Удалить ${user.fio}`}
              >
                <X className="size-3.5" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Поле поиска + dropdown = единая область */}
      <div ref={searchContainerRef} className="relative">
        <Search className="absolute left-3 top-1/2 z-10 size-4 -translate-y-1/2 text-text-muted" />

        <Input
          value={search}
          placeholder={placeholder}
          error={error}
          className="pl-9"
          onFocus={() => setOpen(true)}
          onChange={(event) => {
            setSearch(event.target.value);
            setOpen(true);
          }}
        />

        {open && (
          <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-60 overflow-auto rounded-lg border border-border bg-card p-1 shadow-lg">
            {isLoading ? (
              <div className="px-3 py-2 text-sm text-text-muted">Поиск...</div>
            ) : users.length === 0 ? (
              <div className="px-3 py-2 text-sm text-text-muted">
                {search
                  ? "Пользователи не найдены"
                  : "Начните вводить имя пользователя"}
              </div>
            ) : (
              users.map((user) => {
                const selected = value.includes(user.id);

                return (
                  <button
                    key={user.id}
                    type="button"
                    onClick={() => toggleUser(user)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-md px-3 py-2",
                      "text-left hover:bg-muted-bg",
                      selected && "bg-muted-bg",
                    )}
                  >
                    <div className="min-w-0">
                      <div className="truncate text-sm">{user.fio}</div>

                      <div className="truncate text-xs text-text-muted">
                        {user.email}
                      </div>
                    </div>

                    {selected && (
                      <Check className="size-4 shrink-0 text-primary" />
                    )}
                  </button>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}
